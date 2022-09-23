export class AuthScreen {
  routeName = 'auth';
  params = {};
  constructor(params = {isRegister: false}) {
    this.params = {
      ...this.params,
      ...params,
    };
  }
}

export class CartScreen {
  routeName = 'cart';
  params = {};
  constructor() {}
}

export class OnePageCheckout {
  routeName = 'one-page-checkout';
  params = {};
  constructor(params = {disableAddress: false}) {
    this.params = {
      ...this.params,
      ...params,
    };
  }
}

export class BuyNowTikiNgon {
  routeName = 'buy-now-tiki-ngon';
  params = {};
  constructor(params = {}) {
    this.params = {
      ...this.params,
      ...params,
    };
  }
}

export class QuickPayment {
  routeName = 'quick-payment';
  params = {};
  constructor(params = {url: undefined}) {
    this.params = {
      ...this.params,
      ...params,
    };
  }
}

export class WebViewScreen {
  routeName = 'webview';
  params = {};
  constructor(params = {url: undefined}) {
    this.params = {
      ...this.params,
      ...params,
    };
  }
}
