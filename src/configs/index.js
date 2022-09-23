import Api from './Api';
import Package from './Package';

export default class Configs {
  static environment;

  constructor(environment) {
    if (!Configs.environment) {
      Configs.environment = environment;
    }
  }

  get api() {
    if (Configs.isProduction) {
      return Api.prod;
    } else {
      return Api.dev;
    }
  }

  get package() {
    if (Configs.isProduction) {
      return Package.prod;
    } else {
      return Package.dev;
    }
  }

  static get isProduction() {
    return Configs.environment === 'prod';
  }
}
