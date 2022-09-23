import RNShake from 'react-native-shake';

const callbackUnsubMap = new Map();
const shakeImpl = {
  ...RNShake,
  addListener(callback) {
    callbackUnsubMap.set(callback, RNShake.addListener(callback));
  },
  removeListener(callback) {
    const unsubscribe = callbackUnsubMap.get(callback);
    unsubscribe?.remove?.();
    callbackUnsubMap.delete(callback);
  },
};

export default shakeImpl;
