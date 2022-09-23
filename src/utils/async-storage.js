import RNAsyncStorage from '@react-native-community/async-storage';

export default class AsyncStorage {
  static async getItem(key) {
    try {
      const str = await RNAsyncStorage.getItem(key);
      return JSON.parse(str);
    } catch (er) {
      return undefined;
    }
  }

  static async setItem(key, value) {
    try {
      const str = JSON.stringify(value);
      await RNAsyncStorage.setItem(key, str);
    } catch (error) {}
  }
}
