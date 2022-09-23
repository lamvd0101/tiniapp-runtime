import querystring from 'query-string';
import urlParse from 'url-parse';

// hermes does not support Regex named group
// the alternative solution is instead of using named group
// we using indexed match
const APP_ID_REG_EXP = new RegExp('^/([a-z0-9-_.]+)(/[a-z0-9-_./]*)?$', 'i');

export function getMiniAppInfo(url) {
  const parsed = urlParse(url);
  let pathname = parsed.pathname;
  if (url.startsWith('http') || url.startsWith('https')) {
    //get last path
    if (pathname.startsWith('/apps')) {
      pathname = pathname.replace('/apps', '');
    }
  }
  const match = pathname.match(APP_ID_REG_EXP);
  if (!match) {
    return {};
  }

  const appId = match[1];
  const result = {
    appId,
  };
  if (match.length >= 2) {
    result.pagePath = match[2];
  }
  if (parsed.query) {
    result.params = querystring.parse(parsed.query);

    // get page path from params
    if (result.params.pagePath) {
      const hasPagePath = result.pagePath && result.pagePath !== '/';
      if (!hasPagePath) {
        result.pagePath = result.params.pagePath;
      }
      delete result.params.pagePath;
    }

    // get debug info
    if (result.params._debugInfo) {
      result.debugInfo = JSON.parse(result.params._debugInfo);
      delete result.params._debugInfo;
    }
  }
  return result;
}

export default urlParse;
