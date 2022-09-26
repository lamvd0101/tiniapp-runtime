import * as fetchIntercept from 'fetch-intercept';
import parse from 'url-parse';

import Security from '../../libs/Security';

const SECURITY_TIKI_DOMAINS = ['api.tala.xyz', 'api.tiki.vn'];
const SECURITY_AGENT_DOMAINS = [
  'tiniapp-service-agent-api.tiki.vn',
  'tiniapp-service-agent-api.tala.xyz',
];
export const initInterceptNetwork = () => {
  const unregister = fetchIntercept.register({
    response: async function (response) {
      try {
        const urlString = response.request?.url;
        const url = parse(urlString);
        if (
          SECURITY_TIKI_DOMAINS.includes(url?.host) ||
          SECURITY_AGENT_DOMAINS.includes(url?.host)
        ) {
          const clonedResponse = response.clone();
          let data = await clonedResponse.json();
          const callSecurity = async ({challengeId, request}) => {
            try {
              const securityClass = new Security();
              await securityClass.callSecuritySystem({challengeId});
              data = await fetch(request);
            } catch (e) {}
          };
          const json = async () => {
            if (SECURITY_TIKI_DOMAINS.includes(url?.host)) {
              // Bot detector will return error 428 in response, we need to get challange_id, exchange key with server and then replay request
              if (data?.error?.code === 428) {
                await callSecurity({
                  challengeId: data?.challenge_id,
                  request: response.request,
                });
              }
            } else if (SECURITY_AGENT_DOMAINS.includes(url?.host)) {
              const {reason, metadata} = data?.data?.error || {};
              if (reason === 'suspicious_request') {
                await callSecurity({
                  challengeId: metadata?.challenge_id,
                  request: response.request,
                });
              }
            }
            return data;
          };
          response.json = json;
        }
      } catch (e) {}

      return response;
    },

    responseError: function (error) {
      return Promise.reject(error);
    },
  });

  return unregister;
};
