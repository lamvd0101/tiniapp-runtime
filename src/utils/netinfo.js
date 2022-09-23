import NetInfo from '@react-native-community/netinfo';

const callbackUnsubMap = new Map();
const netInfoImpl = {
  ...NetInfo,
  getNetworkType() {
    return NetInfo.fetch();
  },
  onNetworkStatusChange(callback) {
    callbackUnsubMap.set(
      callback,
      NetInfo.addEventListener(networkType => {
        callback(networkType);
      }),
    );
  },
  offNetworkStatusChange(callback) {
    const unsubscribe = callbackUnsubMap.get(callback);
    unsubscribe();
    callbackUnsubMap.delete(callback);
  },
};

export default netInfoImpl;
