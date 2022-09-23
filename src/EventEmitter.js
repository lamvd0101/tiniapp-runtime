import {v4 as uuidv4} from 'uuid';

export default class EventEmitter {
  static callbacks = {};

  static removeAllListeners() {
    EventEmitter.callbacks = {};
  }

  static emit(eventName, data) {
    if (EventEmitter.callbacks[eventName]) {
      Object.keys(EventEmitter.callbacks[eventName]).map(key => {
        if (typeof EventEmitter.callbacks[eventName][key] === 'function') {
          EventEmitter.callbacks[eventName][key](data);
        }
      });
    }
  }

  _prefix = '';

  constructor() {
    this._prefix = uuidv4();
  }

  addEventListener(eventName, callback) {
    if (!EventEmitter.callbacks[eventName]) {
      EventEmitter.callbacks[eventName] = {};
    }
    EventEmitter.callbacks[eventName][this._prefix] = callback;
  }

  removeEventListener(eventName) {
    if (EventEmitter.callbacks[eventName]) {
      delete EventEmitter.callbacks[eventName][this._prefix];
    }
  }
}
