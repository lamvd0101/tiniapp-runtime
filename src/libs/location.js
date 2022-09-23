import * as Geolocation from '@react-native-community/geolocation';
export default class Location {
  getCurrentPosition(callbackSuccess, callbackError, options) {
    Geolocation.getCurrentPosition(
      position => {
        callbackSuccess(position);
      },
      error => {
        callbackError(error);
      },
      options,
    );
  }
}
