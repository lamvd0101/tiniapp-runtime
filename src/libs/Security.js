export default class Security {
  callSecuritySystem({challengeId}) {
    return new Promise(async (resolve, reject) => {
      try {
        throw new Error('Security failed.');
      } catch (error) {
        reject(error);
      }
    });
  }
}
