import {CommonActions} from '@react-navigation/native';
import qs from 'query-string';
import urlParse from 'url-parse';

import AppProps from '../../app.props';
import {getMiniAppInfo} from '../../utils/url-parse';
import AppListModel from '../AppList/index.model';
import MiniAppModel from '../MiniApp/index.model';
/**
 * Navigate to a target screen
 * 1. If the Tiki React-Native app inside the Tiki app: Navigate to a mini app with meta data params
 * 2. If the Tiki React-Native app outside the Tiki app: Navigate to a screen contains a mini apps list
 * @param {*} props
 */
async function goToTargetScreen(props) {
  try {
    const {navigation} = props;
    const appProps = new AppProps();
    let routeName;
    let params;

    if (appProps.insideTiki) {
      let url = appProps?.moduleParams?.deepLink;
      const source = appProps?.moduleParams?.source;
      const appInfoFromUrl = getMiniAppInfo(url);
      const appId = appInfoFromUrl?.appId;
      const debugInfo = appInfoFromUrl?.debugInfo;
      //get the source send from native, then convert to utm_source if needed
      if (source) {
        const rawURL = urlParse(url);
        const rawURLParams = qs.parse(rawURL.query) || {};
        if (!rawURLParams.utm_source) {
          rawURLParams.utm_source = source;
        }
        if (!rawURLParams.utm_medium) {
          rawURLParams.utm_medium = source;
        }
        rawURL.set('query', `?${qs.stringify(rawURLParams)}`);
        url = rawURL.toString();
      }
      if (appId) {
        routeName = MiniAppModel.routeName;
        params = new MiniAppModel({
          appId,
          url: appInfoFromUrl.pagePath,
          extraData: appInfoFromUrl.params,
          debugInfo,
          enableShowLoading: false,
        });
      } else {
        routeName = AppListModel.routeName;
      }
    } else {
      await appProps.setPropsFromStorage();
      routeName = AppListModel.routeName;
    }

    routeName &&
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: routeName,
              params,
            },
          ],
        }),
      );
  } catch (error) {
    console.error(error);
  }
}

export default function Splash(props) {
  goToTargetScreen(props);
  return null;
}
