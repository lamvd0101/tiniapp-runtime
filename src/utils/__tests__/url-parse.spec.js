import {getMiniAppInfo} from '../url-parse';

describe('getMiniAppInfo', () => {
  [
    {
      name: 'deeplink with only app',
      input: 'tikivn://apps/tinistore.tiki.vn',
      expected: {
        appId: 'tinistore.tiki.vn',
      },
    },
    {
      name: 'universal link with only app',
      input: 'https://tiki.vn/apps/com.tini.appstore',
      expected: {
        appId: 'com.tini.appstore',
      },
    },
    {
      name: 'deeplink with only app and slash',
      input: 'tikivn://apps/tinistore.tiki.vn/',
      expected: {
        appId: 'tinistore.tiki.vn',
        pagePath: '/',
      },
    },
    {
      name: 'universal with only app and slash',
      input: 'https://tiki.vn/apps/tinistore.tiki.vn/',
      expected: {
        appId: 'tinistore.tiki.vn',
        pagePath: '/',
      },
    },
    {
      name: 'deeplink with simple page path',
      input: 'tikivn://apps/tinistore.tiki.vn/hello-world',
      expected: {
        appId: 'tinistore.tiki.vn',
        pagePath: '/hello-world',
      },
    },
    {
      name: 'universal with simple page path',
      input: 'https://tiki.vn/apps/tinistore.tiki.vn/hello-world',
      expected: {
        appId: 'tinistore.tiki.vn',
        pagePath: '/hello-world',
      },
    },
    {
      name: 'deeplink with complex page path',
      input: 'tikivn://apps/tinistore.tiki.vn/pages/page1/index',
      expected: {
        appId: 'tinistore.tiki.vn',
        pagePath: '/pages/page1/index',
      },
    },
    {
      name: 'universal link with complex page path',
      input: 'https://tiki.vn/apps/tinistore.tiki.vn/pages/page1/index',
      expected: {
        appId: 'tinistore.tiki.vn',
        pagePath: '/pages/page1/index',
      },
    },
    {
      name: 'deeplink with page path and page params',
      input:
        'tikivn://apps/tinistore.tiki.vn/pages/page1/index?bookId=1&from=anypage',
      expected: {
        appId: 'tinistore.tiki.vn',
        pagePath: '/pages/page1/index',
        params: {
          bookId: '1',
          from: 'anypage',
        },
      },
    },
    {
      name: 'universal with page path and page params',
      input:
        'https://tiki.vn/apps/tinistore.tiki.vn/pages/page1/index?bookId=1&from=anypage',
      expected: {
        appId: 'tinistore.tiki.vn',
        pagePath: '/pages/page1/index',
        params: {
          bookId: '1',
          from: 'anypage',
        },
      },
    },
    {
      name: 'deeplink with page path as params',
      input:
        'tikivn://apps/tinistore.tiki.vn/?pagePath=pages/page1/index&bookId=1&from=anypage',
      expected: {
        appId: 'tinistore.tiki.vn',
        pagePath: 'pages/page1/index',
        params: {
          bookId: '1',
          from: 'anypage',
        },
      },
    },
    {
      name: 'universal link with page path as params',
      input:
        'https://tiki.vn/apps/tinistore.tiki.vn/?pagePath=pages/page1/index&bookId=1&from=anypage',
      expected: {
        appId: 'tinistore.tiki.vn',
        pagePath: 'pages/page1/index',
        params: {
          bookId: '1',
          from: 'anypage',
        },
      },
    },
  ].forEach(tc => {
    it(`should get correct app id ${tc.input}`, () => {
      const result = getMiniAppInfo(tc.input);
      expect(result).toEqual(tc.expected);
    });
  });
});
