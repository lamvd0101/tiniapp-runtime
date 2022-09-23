import {Dimensions} from 'react-native';
import {getStatusBarHeight as _getStatusBarHeight} from 'react-native-status-bar-height';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

export function getWindowWidth() {
  return window.width;
}

export function getWindowHeight() {
  return window.height;
}

export function getScreenWidth() {
  return screen.width;
}

export function getScreenHeight() {
  return screen.height;
}

export function getStatusBarHeight() {
  return _getStatusBarHeight();
}
