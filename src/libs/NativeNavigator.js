import {NativeModules} from 'react-native';

const {TKRNNavigation} = NativeModules;

export default class NativeNavigator {
  backToHome = () => {
    TKRNNavigation.backToHome();
  };

  backToRoot = (animated = false) => {
    TKRNNavigation.backToRoot(animated);
  };

  back = (animated = true) => {
    TKRNNavigation.back(animated);
  };

  navigate = async route => {
    try {
      if (!route?.routeName) {
        console.error(`${route} is not Router Model`);
        return;
      }
      return await TKRNNavigation.navigate(route?.routeName, route?.params);
    } catch (error) {
      console.error('Router not existed');
    }
  };
}
