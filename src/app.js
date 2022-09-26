import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import AppContainer from './app.container';
import AppProps from './app.props';
import AppEmitterEvents from './AppEmitterEvents';
import Configs from './configs';
import EventEmitter from './EventEmitter';

// please disable this one when we have inter font
window.ENABLE_INTER_FONT = true;

export default class App extends Component {
  timeout = undefined;
  nextProps = undefined;

  componentDidMount() {
    const appProps = new AppProps(this.props);
    // eslint-disable-next-line no-new
    new Configs(appProps.environment);

    // inject environment variable into mini app runtime
    if (appProps.environment === 'prod') {
      window.MINIAPP_ENV = 'production';
    }
  }

  shouldComponentUpdate(nextProps = {}) {
    this.nextProps = nextProps;
    const props = this.props;

    // Workaround when go back from native screen
    if (props.updatedAt !== nextProps.updatedAt) {
      this.emitAll();
    }

    // Login
    if (props.accountInfo?.accessToken !== nextProps.accountInfo?.accessToken) {
      console.log('debug-payment', 'LOGIN');
      this.clearEmitterTimeout();
      EventEmitter.emit(AppEmitterEvents.LOGIN, nextProps);
    }

    // Payment
    if (
      nextProps.extraData &&
      (props.extraData?.paymentOrderCode !==
        nextProps.extraData?.paymentOrderCode ||
        props.extraData?.paymentSuccess !== nextProps.extraData?.paymentSuccess)
    ) {
      console.log('debug-payment', 'PAYMENT');
      this.clearEmitterTimeout();
      EventEmitter.emit(AppEmitterEvents.PAYMENT, nextProps);
    }

    return false;
  }

  // Workaround when go back from native screen
  emitAll = () => {
    this.clearEmitterTimeout();
    this.timeout = setTimeout(() => {
      console.log('debug-payment', 'updatedAt');
      EventEmitter.emit(AppEmitterEvents.LOGIN, this.nextProps);
      EventEmitter.emit(AppEmitterEvents.PAYMENT, this.nextProps);
      this.timeout = undefined;
    }, 2000);
  };

  clearEmitterTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  };

  render() {
    return (
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    );
  }
}
