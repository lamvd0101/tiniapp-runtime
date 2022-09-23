import {PermissionsAndroid, Platform} from 'react-native';
import {addScreenshotListener} from 'react-native-detector';

const callbackUnsubMap = new Map();
const UserCaptureScreen = {
  async addListener(callback) {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        callbackUnsubMap.set(callback, addScreenshotListener(callback));
      }
    } else {
      callbackUnsubMap.set(callback, addScreenshotListener(callback));
    }
  },
  removeListener(callback) {
    const unsubscribe = callbackUnsubMap.get(callback);
    unsubscribe?.remove();
    callbackUnsubMap.delete(callback);
  },
};

export default UserCaptureScreen;
