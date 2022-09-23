import RNSecurityStorage, {
  ACCESS_CONTROL,
  ACCESSIBLE,
  AUTHENTICATION_TYPE,
} from 'react-native-secure-storage';

export default class SecurityStorage {
  convertConfig(config = {}) {
    return {
      ...config,
      accessControl: ACCESS_CONTROL[config?.accessControl],
      accessible: ACCESSIBLE[config?.accessible],
      authenticateType: AUTHENTICATION_TYPE[config?.authenticateType],
    };
  }
  async get(key, config) {
    return RNSecurityStorage.getItem(key, this.convertConfig(config));
  }

  async set(key, value, config) {
    return RNSecurityStorage.setItem(key, value, this.convertConfig(config));
  }

  async remove(key, config) {
    return RNSecurityStorage.removeItem(key, this.convertConfig(config));
  }

  async getAllKeys(config) {
    return RNSecurityStorage.getAllKeys(this.convertConfig(config));
  }
}
