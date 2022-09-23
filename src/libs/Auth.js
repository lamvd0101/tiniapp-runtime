import AppEmitterEvents from '../AppEmitterEvents';
import EventEmitter from '../EventEmitter';
import AppProps from '../app.props';
import {AppError, AuthScreen} from '../models';
import {getAuthCodeFromToken} from '../services/auth';
import {refreshToken} from '../utils/api';
import NativeNavigator from './NativeNavigator';

export default class Auth {
  _getAuthData() {
    return new Promise(async (resolve, reject) => {
      try {
        // Step 1: Checking is logged in
        const props = new AppProps();
        if (props.accountInfo && props.accountInfo.accessToken) {
          resolve();
          return;
        }

        // Step 2: If (Step 1 == false) Navigate to auth screen
        const navigator = new NativeNavigator();
        navigator.navigate(new AuthScreen());

        // Step 3: Listen props changing
        const event = new EventEmitter();
        event.addEventListener(AppEmitterEvents.LOGIN, newProps => {
          // eslint-disable-next-line no-new
          new AppProps(newProps);
          if (newProps?.accountInfo.accessToken) {
            resolve();
          } else {
            reject(new AppError(401, 'Login failed.'));
          }
          event.removeEventListener(AppEmitterEvents.LOGIN);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getAuthCode(appId, scopes) {
    return new Promise(async (resolve, reject) => {
      try {
        await this._getAuthData();
        const props = new AppProps();
        const result = await getAuthCodeFromToken(
          props.accountInfo.accessToken,
          appId,
          scopes,
        );
        resolve({authCode: result, authErrorScopes: {}, authSuccessScopes: []});
      } catch (error) {
        reject(error);
      }
    });
  }

  getUserInfo() {
    return new Promise(async (resolve, reject) => {
      try {
        await this._getAuthData();
        const props = new AppProps();
        resolve({
          customerId: props.accountInfo.customerId,
          name: props.accountInfo.userName,
          email: props.accountInfo.email,
          phoneNumber: props.accountInfo.phoneNumber,
          // we would like to keep both phone and phoneNumber to support
          // backward compatible
          phone: props.accountInfo.phoneNumber,
          avatar: props.accountInfo.avatarUrl || '',
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async isLoggedIn() {
    return new Promise((resolve, reject) => {
      try {
        const props = new AppProps();
        if (props.accountInfo && props.accountInfo.accessToken) {
          resolve(true);
          return;
        }
        resolve(false);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getUserToken(params) {
    return new Promise(async (resolve, reject) => {
      try {
        const appError = new AppError(401, 'No token found');
        if (params && params.openLogin) {
          await this._getAuthData();
        }
        const props = new AppProps();
        if (props.accountInfo && props.accountInfo.accessToken) {
          resolve({token: props.accountInfo.accessToken});
          return;
        }
        reject(appError);
      } catch (error) {
        reject(error);
      }
    });
  }

  async refreshUserToken() {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await refreshToken();
        resolve({token: token.accessToken});
      } catch (error) {
        reject(error);
      }
    });
  }
}
