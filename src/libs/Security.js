// import {Utilities} from '@tiki/common';

// import AppProps from '../app.props';
// import {AppError} from '../models';
// import {challenges} from '../services/security';

export default class Security {
  callSecuritySystem({challengeId}) {
    return new Promise(async (resolve, reject) => {
      try {
        // const props = new AppProps();
        // const str = await Utilities.runTest(challengeId);
        // const res = await challenges(str, props.accountInfo.accessToken);

        // if (res.status) {
        //   resolve(res);
        //   return;
        // }
        // if (res?.error?.message) {
        //   reject(new AppError(400, res?.error?.message));
        //   return;
        // }
        throw new Error('Security failed.');
      } catch (error) {
        reject(error);
      }
    });
  }
}
