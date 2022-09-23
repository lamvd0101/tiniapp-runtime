import {
  ContainerProvider,
  ContainerRuntime,
  RenderLayout,
} from '@hoangviet/tf-miniapp-core';
import {CommonActions} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';

// import DeviceInfo from 'react-native-device-info';
import Loading from '../../components/Loading';
import {queryAppInfo, queryAppMeta} from '../../services/packages';
import * as Dimensions from '../../utils/dimentions';

const Config = {
  FRAMEWORK_CDN_BASE_URL: 'https://packages.tbox.vn',
};

const createContainerProvider = () => {
  const containerProvider = new ContainerProvider();
  containerProvider
    // .setDeviceInfoImpl(DeviceInfo)
    .setRuntimeViewImpl('StatusBar', StatusBar)
    // .setRuntimeViewImpl('List', List)
    // .setRuntimeViewImpl('ListItem', List.Item)
    // .setRuntimeViewImpl('Carousel', Carousel)
    .setDimensionsImpl(Dimensions);
  return containerProvider;
};

const bootstrapApp = async opts => {
  const provider = createContainerProvider();
  const runtime = new ContainerRuntime(provider);
  await runtime.startApp(opts);
  return runtime;
};

const appOptionStore = {};

export default function MiniApp(props) {
  const [currentApp, setCurrentApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  const {route, navigation} = props;
  const {appId, iconUrl, cdnBaseUrl, url} = route.params;

  const getAppMeta = useCallback(async () => {
    try {
      const appMeta = await queryAppMeta(cdnBaseUrl);
      bootstrapApp({
        frameworkCdnBaseUrl: Config.FRAMEWORK_CDN_BASE_URL,
        appMeta: {...appMeta, url},
        onReady: app => setCurrentApp(app),
        onAppStarted: () => setLoading(false),
        onDestroyApp: () => navigation.pop(),
        onNavigateToMiniApp: async (request, callback) => {
          // eslint-disable-next-line no-shadow
          const {appId, page, referrerInfo} = request;
          try {
            const appInfo = await queryAppInfo(appId);
            if (appInfo && appInfo.error) {
              throw new Error(appInfo.error);
            }
            navigation.dispatch(
              CommonActions.navigate({
                name: 'MiniApp',
                params: {
                  ...appInfo,
                  url: `${page}?referrerInfo=${encodeURIComponent(
                    referrerInfo,
                  )}`,
                },
              }),
            );
            if (callback) {
              callback();
            }
          } catch (e) {
            callback(new Error(`Could not navigate to ${appId}`));
          }
        },
        onNavigateBackMiniApp: (request, callback) => {
          // eslint-disable-next-line no-shadow
          const {appId, referrerInfo} = request;
          appOptionStore[appId] = {referrerInfo};
          if (callback) {
            callback();
          }
        },
      });
    } catch (error) {}
  }, [cdnBaseUrl, navigation, url]);

  useEffect(() => {
    getAppMeta();
  }, [getAppMeta]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (currentApp && !currentApp.isDestroyed()) {
        const appOptions = appOptionStore[appId] || {};
        currentApp.onResume(appOptions);
        appOptionStore[appId] = {};
      }
    });
    return unsubscribe;
  }, [navigation, appId, currentApp]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      if (currentApp && !currentApp.isDestroyed()) {
        if (currentApp && !currentApp.isDestroyed()) {
          currentApp.onPause();
        }
      }
    });
    return unsubscribe;
  }, [navigation, currentApp]);

  if (loading || !ready) {
    return (
      <Loading
        iconUrl={iconUrl}
        onReady={() => {
          setReady(true);
        }}
      />
    );
  }

  return <RenderLayout {...props} app={currentApp} />;
}

MiniApp.navigationOptions = {
  headerShown: false,
};
