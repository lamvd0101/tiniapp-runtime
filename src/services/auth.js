import {graphqlRequest} from '../utils/api';

export const getAuthCodeFromToken = async (token, appId, scopes) => {
  const query = `
    query get_auth_code($app_identifier: String!, $tiki_token: String!, $scopes: [String!]!) {
        get_auth_code(
          input: {
            app_identifier: $app_identifier
            tiki_token: $tiki_token
            scopes: $scopes
          }) {
              code
          }
      }
    `;
  const variables = {
    app_identifier: appId,
    tiki_token: token,
    scopes: scopes,
  };
  const res = await graphqlRequest({
    query,
    variables,
    headers: {
      'X-TiniApp-Id': appId,
    },
  });
  return res.data.get_auth_code.code;
};
