import {isPaymentSandboxLink, isPaymentSandboxSuccess} from '../sandbox';

describe('Payment', () => {
  describe('isPaymentSandboxLink', () => {
    const testCases = [
      {
        name: 'return true if link has no params',
        input: 'tikivn://sandbox-payment/any-prefix',
        output: true,
      },
      {
        name: 'return true if link has params',
        input: 'tikivn://sandbox-payment?status=succeed',
        output: true,
      },
      {
        name: 'return false if link does not start with correct prefix',
        input: 'tiki://a.bc',
        output: false,
      },
      {
        name: 'return false if link from incorrect scheme',
        input: 'tiki://sandbox-payment',
        output: false,
      },
    ];

    testCases.forEach(tc => {
      it(tc.name, () => {
        expect(isPaymentSandboxLink(tc.input)).toEqual(tc.output);
      });
    });
  });

  describe('isPaymentSandboxSuccess', () => {
    const testCases = [
      {
        name: 'return false with no param',
        input: 'tikivn://sandbox-payment/any-prefix',
        output: false,
      },
      {
        name: 'return false with status not succeed',
        input: 'tikivn://sandbox-payment?status=failed',
        output: false,
      },
      {
        name: 'return true with status succeed',
        input: 'tikivn://sandbox-payment?status=succeed',
        output: true,
      },
    ];

    testCases.forEach(tc => {
      it(tc.name, () => {
        expect(isPaymentSandboxSuccess(tc.input)).toEqual(tc.output);
      });
    });
  });
});
