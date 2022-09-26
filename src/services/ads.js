import {NativeModules, Platform} from 'react-native';
const {TKRNTracking} = NativeModules;

export const getInterstitialAd = async params => {
  return new Promise(async (resolve, reject) => {
    let cookie = '2b9a4b52-73c9-1ad5-28cd-b3e5d9e4d816'; // default cookie
    try {
      cookie = await TKRNTracking.getTrackityId();
    } catch (e) {}
    try {
      const res = await fetch(
        `https://tka.tiki.vn/searcher/search?zone_id=tiniapp_${
          Platform.OS
        }_horizontalbanner&cookie=${cookie}&tini_app=${encodeURIComponent(
          params?.appName || '',
        )}`,
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        },
      );

      const resJSON = await res.json();

      const {error} = resJSON;
      if (error) {
        reject(error.msg);
      } else {
        const {data = {}} = resJSON;
        const {adm = []} = data;
        if (adm.length > 0) {
          const {ad = []} = adm[0];
          if (ad.length > 0) {
            const {
              clickUrl,
              trueImpUrl,
              impUrl,
              properties = {},
              image_ratio,
            } = ad[0];
            const {image, url} = properties;
            resolve({
              clickUrl: clickUrl.startsWith('//')
                ? 'https:' + clickUrl
                : clickUrl,
              trueImpUrl: trueImpUrl.startsWith('//')
                ? 'https:' + trueImpUrl
                : trueImpUrl,
              impUrl: impUrl.startsWith('//') ? 'https:' + impUrl : impUrl,
              adsImageUrl: image,
              adsUrl: url,
              imageRatio: image_ratio,
            });
          }
        }
        reject(new Error('No ad found'));
      }
    } catch (e) {
      reject(e.message);
    }
  });
};
