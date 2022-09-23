import {NativeModules, Platform} from 'react-native';

const {TKRNTracking} = NativeModules;

const _screenEvent = (event, params) => {
  try {
    TKRNTracking.screenEvent(event, params);
  } catch (error) {
    console.log('screenEvent', error);
  }
};

const _trackityEvent = params => {
  try {
    TKRNTracking.trackTrackityEvent(params);
  } catch (error) {
    console.log('trackityEvent', error);
  }
};

const _trackityEventV2 = params => {
  try {
    const {name = '', params: rawParams} = params;
    TKRNTracking.trackTrackityEventV2(name, rawParams);
  } catch (error) {
    console.log('trackityEventV2', error);
  }
};

const _amplitudeEvent = params => {
  try {
    const {name = '', params: rawParams} = params;
    TKRNTracking.trackAmplitudeEvent(name, rawParams);
  } catch (error) {
    console.log('amplitudeEvent', error);
  }
};

const _stackityEvent = params => {
  try {
    // Android will be added later
    if (TKRNTracking.trackStackityEvent) {
      const {name = '', params: rawParams} = params;
      TKRNTracking.trackStackityEvent(name, rawParams);
    }
  } catch (error) {
    console.log('stackityEvent', error);
  }
};

const setDoriInfo = params => {
  try {
    TKRNTracking.setDoriInfo(params);
  } catch (error) {
    console.log('setDoriInfo', error);
  }
};

// Exports
const logAppEvent = evt => {
  const {event = '', params = {}} = evt;
  switch (event) {
    case 'screen_view':
      _screenEvent(event, params);
      break;
  }
};
const logInternalEvent = evt => {
  const {provider = '', params = {}} = evt;
  switch (provider) {
    case 'trackity':
      const {
        tk_category = '',
        tk_label = '',
        tk_action = '',
        ...rawParams
      } = params;
      const name = tk_category + '_' + tk_label + '_' + tk_action;

      _trackityEvent(params);
      _trackityEventV2({name, params: rawParams});
      break;
    case 'amplitude':
      _amplitudeEvent(params);
      break;
    case 'stackity':
      _stackityEvent(params);
    case 'trackityV2':
      _trackityEventV2(params);
      break;
  }
};
export default {logAppEvent, logInternalEvent, setDoriInfo};
