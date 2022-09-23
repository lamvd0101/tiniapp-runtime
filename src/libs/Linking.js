import {Linking} from 'react-native';

const whiteListDomain = [
  'tala.xyz',
  'survey.tala.xyz',
  'feed.tala.xyz',
  'vntiki.onelink.me',
  'tiki.vn',
  'ti.ki',
  'dzut.tiki.vn',
  'feed.tiki.vn',
];

const isDeepLink = (url = '') => {
  return url.startsWith('tikivn://');
};

const isUniversalLink = urlString => {
  try {
    const urlRegex = /^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i;
    let domains = urlString.match(urlRegex)[1];
    return whiteListDomain.includes(domains);
  } catch {}
};

const openURL = (url = '') => {
  if (isDeepLink(url) || isUniversalLink(url)) {
    // TKRNLinking.openURL(url);
    return;
  }
  Linking.openURL(url);
};

export default {
  ...Linking,
  openURL,
};
