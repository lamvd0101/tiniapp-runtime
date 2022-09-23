import querystring from 'query-string';

export function isPaymentSandboxLink(url) {
  return url.startsWith('tikivn://sandbox-payment');
}

export function isPaymentSandboxSuccess(url) {
  if (url.indexOf('?') < 0) {
    return false;
  }

  const query = url.slice(url.indexOf('?'));
  const data = querystring.parse(query);
  return data.status === 'succeed';
}
