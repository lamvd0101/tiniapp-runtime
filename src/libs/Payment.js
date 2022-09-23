import querystring from 'query-string';
import {Linking, NativeModules} from 'react-native';
import base64 from 'react-native-base64';

import AppEmitterEvents from '../AppEmitterEvents';
import EventEmitter from '../EventEmitter';
import AppProps from '../app.props';
import {
  AppError,
  BuyNowTikiNgon,
  OnePageCheckout,
  QuickPayment,
} from '../models';
import {
  checkOrderStatus,
  createPayment,
  notifyPaymentStatus,
} from '../services/payment';
import {isPaymentSandboxLink, isPaymentSandboxSuccess} from '../utils/sandbox';
import NativeNavigator from './NativeNavigator';
const {TKRNTracking} = NativeModules;

export default class Payment {
  makePayment({orderId, paymentMethod, appId}) {
    return new Promise(async (resolve, reject) => {
      try {
        // Step 1: Get accessToken
        const appProps = new AppProps();

        // Step 2: Get payment link
        const configs = {
          payment_method: paymentMethod,
          return_url: {
            url: '',
            app: '',
            should_redirect: true,
          },
          countdown: 600,
        };
        TKRNTracking.trackAmplitudeEvent('call_tini_payment', {
          type: 'quick_payment',
          app_id: appId,
          order_id: orderId,
        });
        const paymentLink = await createPayment(
          orderId,
          configs,
          appProps.accountInfo.accessToken,
          appId,
        );

        if (paymentMethod === 'cod' || paymentMethod === 'bank_transfer') {
          TKRNTracking.trackAmplitudeEvent('receive_tini_payment_result', {
            type: 'quick_payment',
            status: 'success',
            app_id: appId,
            order_id: orderId,
          });
          resolve('success');
          return;
        }

        // handle payment sandbox
        if (isPaymentSandboxLink(paymentLink)) {
          if (isPaymentSandboxSuccess(paymentLink)) {
            TKRNTracking.trackAmplitudeEvent('receive_tini_payment_result', {
              type: 'quick_payment',
              status: 'success',
              app_id: appId,
              order_id: orderId,
            });
            resolve(paymentLink);
          } else {
            TKRNTracking.trackAmplitudeEvent('receive_tini_payment_result', {
              type: 'quick_payment',
              status: 'fail',
              fail_reason: '',
              app_id: appId,
              order_id: orderId,
            });
            reject(new AppError(400, 'Payment failed.'));
          }
          return;
        }

        const callbackUrl = appProps?.moduleParams?.deepLink;
        const navigator = new NativeNavigator();
        navigator.navigate(new QuickPayment({url: paymentLink, callbackUrl}));

        // Step 3: Listen props changing
        const event = new EventEmitter();
        event.addEventListener(AppEmitterEvents.PAYMENT, async props => {
          const extraData = props?.extraData;
          if (extraData?.paymentSuccess) {
            TKRNTracking.trackAmplitudeEvent('receive_tini_payment_result', {
              type: 'quick_payment',
              status: 'success',
              app_id: appId,
              order_id: orderId,
            });
            resolve(paymentLink);
          } else {
            const status = await checkOrderStatus(
              `urn:order:order:${orderId}`,
              appId,
              appProps?.accountInfo?.accessToken,
            );
            if (
              status &&
              (status === 'online_paid' || status === 'completed')
            ) {
              TKRNTracking.trackAmplitudeEvent('receive_tini_payment_result', {
                type: 'quick_payment',
                status: 'success',
                app_id: appId,
                order_id: orderId,
              });
              resolve(paymentLink);
            } else {
              TKRNTracking.trackAmplitudeEvent('receive_tini_payment_result', {
                type: 'quick_payment',
                status: 'fail',
                fail_reason: extraData?.paymentErrorMessage,
                app_id: appId,
                order_id: orderId,
              });
              reject(
                new AppError(
                  400,
                  `Payment failed. Order ID: ${extraData?.paymentOrderCode}`,
                ),
              );
            }
          }
          event.removeEventListener(AppEmitterEvents.PAYMENT);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  makePaymentV2({orderId, appId}) {
    return new Promise(async (resolve, reject) => {
      try {
        // Step 1: Get accessToken
        const appProps = new AppProps();

        // Step 2: Get payment link
        const configs = {
          return_url: {
            url: 'https://google.com',
            app: 'tiki://',
            should_redirect: false,
          },
          payment_provider: 'widgetpayment',
          countdown: 600,
        };
        const paymentLink = await createPayment(
          orderId,
          configs,
          appProps.accountInfo.accessToken,
          appId,
        );
        const query = paymentLink.slice(paymentLink.indexOf('?'));
        const paramsUrl = querystring.parse(query);
        resolve(paramsUrl.ref_id);
      } catch (error) {
        reject(error);
      }
    });
  }

  checkout(params) {
    return new Promise(async (resolve, reject) => {
      try {
        const appProps = new AppProps();
        const navigator = new NativeNavigator();
        const {storeID, address, appId, useDeepLink = true} = params || {};

        if (storeID && address) {
          if (useDeepLink) {
            const url = new URL('tikivn://tiki.vn/tikingon/checkout/buy-now');
            const {wardID, districtID, regionID, addressID} = address || {};
            url.searchParams.append('store_id', storeID);
            url.searchParams.append('wardID', wardID);
            url.searchParams.append('districtID', districtID);
            url.searchParams.append('regionID', regionID);
            url.searchParams.append('addressID', addressID);
            url.searchParams.append(
              'callback',
              base64.encode('tikivn://apps?is_callback=true'),
            );
            // url.searchParams.append('callback', 'dGlraXZuOi8vdGlraS14dQ=='); // tiki.vn://tiki-xu
            const urlString = url.toString();
            if (Linking.canOpenURL(urlString)) {
              try {
                await notifyPaymentStatus({
                  status: 'checkout',
                  appId: appId,
                  accessToken: appProps.accountInfo.accessToken,
                  storeId: storeID,
                });
              } catch (e) {
                //log to server
                console.log(e);
              }
              await Linking.openURL(urlString);
            } else {
              reject({
                error: '404',
                errorMessage: "Can't open checkout page",
              });
            }
          } else {
            navigator.navigate(new BuyNowTikiNgon(params));
          }
        } else {
          navigator.navigate(new OnePageCheckout(params));
        }

        // Step 3: Listen props changing
        const event = new EventEmitter();
        event.addEventListener(AppEmitterEvents.PAYMENT, async props => {
          const extraData = props?.extraData;
          const {paymentSuccess, paymentOrderCode} = extraData || {};
          if (paymentSuccess) {
            try {
              await notifyPaymentStatus({
                status: 'paymentSuccess',
                orderCode: paymentOrderCode,
                appId: appId,
                accessToken: appProps.accountInfo.accessToken,
              });
            } catch (e) {
              //TODO: should alert somewhere because payment is success but we can't notify backend
              console.log('notify payment fail', e);
            } finally {
              resolve(paymentOrderCode);
            }
          } else if (paymentOrderCode) {
            await notifyPaymentStatus({
              status: 'paymentFail',
              orderCode: paymentOrderCode,
              appId: appId,
              accessToken: appProps.accountInfo.accessToken,
            });
            reject({
              error: '400',
              errorMessage: `Payment failed. Order Code: ${extraData?.paymentOrderCode}`,
            });
          } else {
            reject({
              error: '10000',
              errorMessage: 'User canceled payment',
            });
          }
          event.removeEventListener(AppEmitterEvents.PAYMENT);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
