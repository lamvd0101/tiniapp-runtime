import {
  accelerometer,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';

let subscription;
const accelerometerImpl = {
  start(ms, callback) {
    setUpdateIntervalForType(SensorTypes.accelerometer, ms);
    subscription = accelerometer.subscribe(({x, y, z, timestamp}) =>
      callback({x, y, z, timestamp}),
    );
  },
  stop() {
    subscription.unsubscribe();
  },
};

export default accelerometerImpl;
