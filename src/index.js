import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import AppContainer from './app.container';
import AppProps from './app.props';
import Configs from './configs';

// please disable this one when we have inter font
window.ENABLE_INTER_FONT = true;

export default class App extends Component {
  componentDidMount() {
    const appProps = new AppProps(this.props);
    // eslint-disable-next-line no-new
    new Configs(appProps.environment);
  }

  render() {
    return (
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    );
  }
}
