import {getInterstitialAd} from '../services/ads';
export default class InterstitialAd {
  async load(params) {
    return await getInterstitialAd(params);
  }
}
