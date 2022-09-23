import ReactNativeBiometrics from 'react-native-biometrics';
export default class BioMetrics {
  async isBioMetricsAvailable() {
    const {
      available,
      biometryType,
      error,
    } = await ReactNativeBiometrics.isSensorAvailable();
    //mapping bio type
    let mode;
    if (biometryType === ReactNativeBiometrics.TouchID) {
      mode = 'fingerPrint';
    } else if (biometryType === ReactNativeBiometrics.FaceID) {
      mode = 'facial';
    }
    return {isSupported: available, mode, error};
  }

  async createSignature(params) {
    return new Promise(async (resolve, reject) => {
      try {
        const {content = '', challenge} = params;
        const {
          success,
          error,
          signature,
        } = await ReactNativeBiometrics.createSignature({
          promptMessage: content,
          payload: challenge,
        });
        if (success) {
          resolve({success, signature});
        } else {
          reject({error: '10000', errorMessage: error});
        }
        return;
      } catch (e) {
        reject(e);
      }
    });
  }

  async createKey() {
    return new Promise(async (resolve, reject) => {
      try {
        const {publicKey} = await ReactNativeBiometrics.createKeys();
        resolve({publicKey});
      } catch (e) {
        reject(e);
      }
    });
  }

  async deleteKey() {
    return new Promise(async (resolve, reject) => {
      try {
        await ReactNativeBiometrics.deleteKeys();
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

  async keyExists() {
    return new Promise(async (resolve, reject) => {
      try {
        const {keysExist} = await ReactNativeBiometrics.keyExists();
        resolve(keysExist);
      } catch (e) {
        reject(e);
      }
    });
  }

  async localAuthenticate(params) {
    return new Promise(async (resolve, reject) => {
      try {
        const {content = ''} = params;
        const {success, error} = await ReactNativeBiometrics.simplePrompt({
          promptMessage: content,
        });
        if (success) {
          resolve({success});
        } else {
          reject({error: '10000', errorMessage: error});
        }
        return;
      } catch (e) {
        reject(e);
      }
    });
  }
}
