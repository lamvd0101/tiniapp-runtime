import AppProps from '../app.props';
import {addToCart, getCartInfo} from '../services/cart';
import Security from './Security';

export default class ApiService {
  getCart(params) {
    return new Promise(async (resolve, reject) => {
      try {
        const props = new AppProps();
        const {sellerId} = params;
        const data = await getCartInfo(props.accountInfo.accessToken, sellerId);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  addToCart(params) {
    return new Promise(async (resolve, reject) => {
      try {
        const {products = []} = params;
        const props = new AppProps();
        const accountInfo = props.accountInfo;
        if (!accountInfo || !accountInfo.accessToken) {
          reject({error: '401', errorMessage: 'Unauthorize'});
          return;
        }
        const data = await addToCart(products, accountInfo.accessToken);
        if (data?.error?.code === 428) {
          const challengeId = data?.challenge_id;
          const res = await this.handleSecurityAddToCart(challengeId, params);
          resolve(res);
          return;
        }
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  async handleSecurityAddToCart(challengeId, paramsAddToCart) {
    const securityClass = new Security();
    await securityClass.callSecuritySystem({challengeId});
    return this.addToCart(paramsAddToCart);
  }
}
