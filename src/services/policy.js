import {graphqlRequest} from '../utils/api';

export const getPolicy = async () => {
  const query = `
    {
      frameworkVersion: get_parameter(name: "tiniapp_term_and_service") {
        value
      }
    }
  `;
  const res = await graphqlRequest({
    query,
  });
  return res;
};
