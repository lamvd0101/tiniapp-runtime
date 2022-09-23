import {tikiServiceRequest} from '../utils/api';

export const challenges = async (data, accessToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await tikiServiceRequest(
        'heimdall/v1/challenges',
        {
          method: 'POST',
          body: {data},
        },
        accessToken,
      );
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
