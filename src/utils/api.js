// import {ApiUtil} from '@tiki/common';
import {Platform} from 'react-native';

import AppProps from '../app.props';
import Configs from '../configs';
import {AppError} from '../models';

export const refreshToken = () => {
  return new Promise(async (resolve, reject) => {
    const appError = new AppError(401, 'Login failed.');
    try {
      const props = new AppProps();
      const accountInfo = props.accountInfo;
      if (!accountInfo || !accountInfo.accessToken) {
        reject(appError);
        return;
      }
      const res = await tikiServiceRequest(
        'v2/tokens',
        {
          method: 'POST',
          body: {
            grant_type: 'refresh_token',
            refresh_token: accountInfo.refreshToken,
          },
        },
        accountInfo.accessToken,
      );
      const newToken = {
        accessToken: res?.access_token,
        refreshToken: res?.refresh_token,
      };
      props.accountInfo = {
        ...accountInfo,
        ...newToken,
      };
      resolve(newToken);
    } catch (error) {
      reject(appError);
    }
  });
};

const request = async (
  {query, variables, headers: rawHeaders = {}},
  accessToken,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'X-Tiki-Access-Token': accessToken,
        'X-TiniApp-Platform': `mobile-${Platform.OS}`,
        ...rawHeaders,
      };
      const configs = new Configs();
      const response = await fetch(configs.api.MINI_APP_GRAPHQL, {
        body: JSON.stringify({query, variables}),
        method: 'POST',
        headers,
      });
      resolve(response.json());
    } catch (error) {
      reject(error);
    }
  });
};

export const tikiServiceRequest = (
  endpoint,
  {method = 'GET', body, headers: rawHeaders = {}},
  accessToken,
) => {
  return new Promise(async (resolve, reject) => {
    const configs = new Configs();
    const props = new AppProps();

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': accessToken,
      'X-TiniApp-Platform': `mobile-${Platform.OS}`,
      // 'User-Agent': await ApiUtil.getUserAgent(props.environment),
      ...rawHeaders,
    };

    fetch(`${configs.api.TIKI_SERVICE}/${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
      .then(response => resolve(response.json()))
      .then(error => reject(error));
  });
};

export const graphqlRequest = async (params, accessToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await request(params, accessToken);

      const errors = data?.errors || [];
      const tokenError = errors.find(
        item => item.extensions.reason === 'invalid_token',
      );

      if (tokenError) {
        let newToken = await refreshToken();
        data = await request(params, newToken?.accessToken);
      }

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
