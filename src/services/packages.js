import Configs from '../configs';

function makeRequest(path, cdnBaseUrl = new Configs().package.APP_REGISTRY) {
  if (path[0] === '/') {
    path = path.slice(1);
  }
  const url = `${cdnBaseUrl}${path !== '' ? `/${path}` : ''}`;
  return fetch(url);
}

export function queryAppList() {
  return makeRequest('apps', new Configs().package.APP_REGISTRY_OLD).then(res =>
    res.json(),
  );
}

export async function queryAppInfo(appId) {
  return makeRequest(`apps/${appId}`, new Configs().package.APP_REGISTRY).then(
    res => res.json(),
  );
}

export function queryDevAppList(
  userId,
  cdnBaseUrl = new Configs().package.APP_REGISTRY,
) {
  return makeRequest(`dev/${userId}/apps`, cdnBaseUrl).then(res => res.json());
}
