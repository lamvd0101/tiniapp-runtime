import DeviceBrightness from '@adrianso/react-native-device-brightness';
import {MiniAppPage, MiniAppProvider} from '@hoangviet/tf-miniapp-core';
import AsyncStorage from '@react-native-community/async-storage';
import Clipboard from '@react-native-community/clipboard';
import {StackActions} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {Linking, Platform, StatusBar, Vibration} from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import KeepScreenOn from 'react-native-keep-awake';
import Permission from 'react-native-permissions';
import * as Progress from 'react-native-progress';
import RNFetchBlob from 'rn-fetch-blob';
import TboxCommons from 'tbox-commons';

import Configs from '../../configs';
import {
  ApiService,
  BioMetrics,
  Chat,
  Contact,
  DeviceInfo,
  InterstitialAd,
  Location,
  NativeNavigator,
  Security,
  SecurityStorage,
  tracker,
} from '../../libs';
import Accelerometer from '../../utils/Accelerometer';
import AppSecretDecoder from '../../utils/AppSecretDecoder';
import * as Dimensions from '../../utils/dimensions';
import NetInfo from '../../utils/netinfo';
import Shake from '../../utils/shake';
import UserCaptureScreen from '../../utils/UserCaptureScreen';
import DialogPolicy from './DialogPolicy';
import ErrorBoundary from './ErrorBoundary';

const appOptionStore = {};

const MiniApp = props => {
  const {navigation, route} = props;
  const {params = {}} = route;
  const currentApp = React.useRef(undefined);
  const currentPolicy = React.useRef(undefined);
  const appId = params.appId ?? '';

  let appMeta =
    typeof params.appMeta === 'string'
      ? JSON.parse(params.appMeta)
      : params.appMeta;
  if (params.debugInfo) {
    appMeta = params.debugInfo;
  }

  let iconUrl = params.iconUrl ?? '';
  if (appMeta && appMeta.imageUrl) {
    iconUrl = appMeta.imageUrl;
  }
  const url = params.url ?? '';
  const extraData = params.extraData ?? {};
  const debugToken = params.debugToken ?? null;
  const debugSessionId = params.debugSessionId ?? null;
  const debugChannelId = params.debugChannelId ?? null;

  const configs = new Configs();

  const frameworkCdnBaseUrl = appMeta?.frameworkCdnBaseUrl
    ? appMeta?.frameworkCdnBaseUrl
    : configs.package.FRAMEWORK_CDN_BASE_URL;
  const cdnBaseUrl = params.debugInfo
    ? appMeta?.cdnBaseUrl
    : configs.package.APP_REGISTRY;

  const opts = {
    appMeta,
    debugMode: params.debugMode,
    debugToken: {
      debugToken,
      debugSessionId,
      debugChannelId,
    },
    frameworkCdnBaseUrl,
    cdnBaseUrl,
    container: {
      DeviceInfo,
      Dimensions,
      StatusBar,
      AsyncStorage,
      Keyboard: TboxCommons,
      Clipboard,
      Linking,
      Contact: new Contact(),
      FileSystem: RNFetchBlob.fs,
      InterstitialAd: new InterstitialAd(),
      ApiService: new ApiService(),
      Security,
      NativePermissions: Permission,
      Brightness: DeviceBrightness,
      KeepScreenOn,
      NetInfo,
      Vibration,
      Chat: new Chat(),
      Compass: CompassHeading,
      Shake,
      AppSecretDecoder,
      UserCaptureScreen,
      Accelerometer,
      BioMetrics: new BioMetrics(),
      Location: new Location(),
      SecurityStorage: new SecurityStorage(),
      useNativeWorker: Platform.OS === 'ios',
    },
    tracker,
    runtime: {
      onDestroyApp() {
        if (navigation.canGoBack()) {
          navigation.pop();
        } else {
          const navigator = new NativeNavigator();
          navigator.back();
        }
      },
      async onOpenStore() {
        const appStore = 'tikivn://apps/com.tini.appstore';
        if (await Linking.canOpenURL(appStore)) {
          if (navigation.canGoBack()) {
            navigation.pop();
          }
          await Linking.openURL(appStore);
        }
      },
      onMiniappReload(request) {
        navigation.replace('MiniApp', {...params, ...request});
      },
      onNavigateToMiniApp({appInfo, page, referrerInfo, relaunch = false}) {
        const appParams = {
          ...appInfo,
          url: `${page}?referrerInfo=${encodeURIComponent(referrerInfo)}`,
        };
        const screenName = 'MiniApp';
        let pushAction = relaunch
          ? StackActions.replace(screenName, appParams)
          : StackActions.push(screenName, appParams);

        navigation.dispatch(pushAction);
      },
      onNavigateBackMiniApp({appId: _appId, page, referrerInfo}) {
        appOptionStore[_appId] = {referrerInfo};
        const state = navigation.dangerouslyGetState();
        const {routes = []} = state || {};

        const lastAppIndex = routes
          .slice(0, -1)
          .map(({name, params: _params}) =>
            name === 'MiniApp'
              ? _params.appMeta?.appId || _params.appId
              : undefined,
          )
          .lastIndexOf(_appId);
        if (lastAppIndex >= 0) {
          navigation.navigate({name: 'MiniApp', key: routes[lastAppIndex].key});
        } else {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }
      },
    },
  };

  useFocusEffect(
    React.useCallback(() => {
      if (appOptionStore[appId]) {
        currentApp?.current?.onResume(appOptionStore[appId]);
        delete appOptionStore[appId];
      }
    }, [appId]),
  );

  const onReady = React.useCallback(app => {
    currentApp.current = app;
    currentPolicy.current?.showPolicy?.();
  }, []);

  return (
    <MiniAppProvider>
      <ErrorBoundary>
        <MiniAppPage
          extraData={extraData}
          appId={appId}
          url={url}
          iconUrl={iconUrl}
          opts={opts}
          ProgressComponent={Progress.Circle}
          onReady={onReady}
          enableShowLoading={params.enableShowLoading || true}
        />
        <DialogPolicy
          ref={currentPolicy}
          exitMiniApp={opts.runtime.onDestroyApp}
          navigation={navigation}
        />
      </ErrorBoundary>
    </MiniAppProvider>
  );
};

export default MiniApp;
