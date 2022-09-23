import DeviceInfo from 'react-native-device-info';

import Configs from '../configs';

const deviceInfoImpl = {
  ...DeviceInfo,
  // add dev to tala app
  getApplicationName() {
    const name = DeviceInfo.getApplicationName();
    return Configs.isProduction ? name : `${name}-Dev`;
  },
  getHostVersion() {
    return DeviceInfo.getVersion();
  },
  getRuntimeVersion() {
    // this variable is injected by webpack
    // eslint-disable-next-line no-undef
    return __TF_RUNTIME_VERSION__;
  },
};

export default deviceInfoImpl;
