import AsyncStorage from './utils/async-storage';

const APP_PROPS_KEY = 'APP_PROPS';

/**
 * This is a props class defined from native app
 */

export default class AppProps {
  static instance = undefined;
  props = {};

  constructor(props) {
    if (!AppProps.instance || props) {
      this.props = {...this.props, ...props};
      AppProps.instance = this;
    }
    return AppProps.instance;
  }

  get insideTiki() {
    return this.props.insideTiki;
  }
  set insideTiki(value) {
    AppProps.instance.props.insideTiki = value;
  }

  get environment() {
    return this.props.environment;
  }
  set environment(value) {
    AppProps.instance.props.environment = value;
  }

  get module() {
    return this.props.module;
  }
  set module(value) {
    AppProps.instance.props.module = value;
  }

  get moduleParams() {
    return this.props.moduleParams;
  }
  set moduleParams(value) {
    AppProps.instance.props.moduleParams = value;
  }

  get remoteConfigs() {
    return this.props.remoteConfigs;
  }
  set remoteConfigs(value) {
    AppProps.instance.props.remoteConfigs = value;
  }

  get accountInfo() {
    return this.props.accountInfo;
  }
  set accountInfo({
    customerId,
    accessToken,
    refreshToken,
    location,
    address,
    userName,
    email,
    phoneNumber,
    avatarUrl,
    cartNumber,
    isTikier,
  }) {
    AppProps.instance.props.accountInfo = {
      customerId,
      accessToken,
      refreshToken,
      location,
      address,
      userName,
      email,
      phoneNumber,
      avatarUrl,
      cartNumber,
      isTikier,
    };
  }

  async setPropsFromStorage() {
    const props = await AsyncStorage.getItem(APP_PROPS_KEY);
    if (props) {
      this.props = props;
    }
  }
  async savePropsIntoStorage() {
    await AsyncStorage.setItem(APP_PROPS_KEY, this.props);
  }
  async resetPropsInStorage() {
    await AsyncStorage.setItem(APP_PROPS_KEY, undefined);
  }
}
