import {graphqlRequest} from '../utils/api';

export const getChatInfo = async (appId, accessToken) => {
  const query = `
    query app_chat_info_get($app_identifier: String!) {
      app_chat_info_get(app_identifier: $app_identifier) {
            app_identifier
            business_id
            team_id
          }
      }
    `;
  const variables = {
    app_identifier: appId,
  };
  const res = await graphqlRequest(
    {
      query,
      variables,
      headers: {
        'X-TiniApp-Id': appId,
      },
    },
    accessToken,
  );
  return res.data?.app_chat_info_get;
};
