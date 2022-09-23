export default class MiniAppModel {
  static routeName = 'MiniApp';

  appId = undefined;
  appName = undefined;
  appVersion = undefined;
  cdnBaseUrl = undefined;
  frameworkCdnBaseDomain = undefined;
  frameworkVersion = undefined;
  sha256 = undefined;
  url = undefined;
  extraData = undefined;
  debugInfo = undefined;
  enableShowLoading = true;

  constructor({
    appId,
    url,
    extraData,
    appName,
    appVersion,
    cdnBaseUrl,
    frameworkCdnBaseDomain,
    frameworkVersion,
    sha256,
    debugInfo,
    enableShowLoading = true,
  }) {
    this.appId = appId;
    this.appName = appName;
    this.appVersion = appVersion;
    this.cdnBaseUrl = cdnBaseUrl;
    this.frameworkCdnBaseDomain = frameworkCdnBaseDomain;
    this.frameworkVersion = frameworkVersion;
    this.sha256 = sha256;
    this.url = url;
    this.extraData = extraData;
    this.debugInfo = debugInfo;
    this.enableShowLoading = enableShowLoading;
  }
}
