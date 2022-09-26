import encoding from 'text-encoding';

import Configs from '../configs';
var joseNode = require('node-jose');

const coreVersionPrivateKey = {
  dev: new Map([
    [
      'v1.92.2',
      {
        use: 'enc',
        kty: 'RSA',
        kid: 'FYb-Zy6TwQJJOyGPjP_6q0GXWHuomRwluJvFWMn0Rxc=',
        alg: 'RSA-OAEP',
        n: 'xrZtoZQZj7LdWBsDehCOug4_0z0nLPV21Gbwjs9UqGxpT8huiTYCS6qqH2F13P89h4k70deHgFzbqfaCHTVMabg99RV9_ICQcky81mxxRfeKtD9h9-Bes0GwkKxb-wvaYqFfB4VG26-eZZ-ZwR7Oq81zqI8YC9dnn7aSBV-4k9Zx4SiHBR_8_Rd9BeS89mMcScjo1hr3tnpf9JcvoNtwKONvlfVRq33qqDyTTNBpSX8KZM4SAE2xpHd96g2tn2y_qlTKn8hM4YcfCed4_wyTxb6JnWixVnASK-MwUgM0yeKjWWLEKpVFixJEhgAHsfXHVPydrYMiIGp_nlfnwg2tiw',
        e: 'AQAB',
        d: 'AdsKQwwDARiGgKAf9C_bZVlktzBHAWB5b5pWfL7q53e7tAcHITjj5Jj_ZbOfSiUICg_6AwekOEqlsnye0m8A-6vAyF0fBBCfSLH2wXnZxPF-1hgRbiMmPz5Jy9AQO9PsgidHn-Zatwp4zDIlWWxUOb59agGME_A7A37M9kfijV7bEvITZScUuaD-ylhF_KenneLFpRegWAGkq62_9tjKle4lsIVjxUoOC1EFv-bHccwlege-mWxzRSTMfbwdb6fYgEn4nTVJjX5ZBIZW8XCFKwgDvEfElgPQgzJgkwKKvPnuueZkSyHWjNpNKy0HZyajluwBPArzN2AfVrTEKQf-wQ',
        p: '30F-V8xrO8shpV4ikgmhGnjLPDnRv0drvyZBZMjKv5LBhZtgNoUxnTvv_qo4pq0sJ1sCLLI000KXAAWjNHLK86Euo-ov4jDDl7olzErZR8NDZo-pcIAaGjvXixs_XiAF_e-ncnla2uy3SnXfrZIG02vGrUTc3vWOiaJz3CDIqJk',
        q: '49trS_0btS-RRlzbIH9QHZ3LrKrQJi6k7uS_Wn1lbIUYCKdOtaMGToXJn_YII2pMf2iofsBFwUVnVllJWycTglvGZqJlENj2WO76yT2gozQur3q2hl2ynFM6lz-ALd8fst5jZSIdRK67LVB2R6TvesmW616IdGQGVCxeqdUS6cM',
        dp: 'B-LdXqaW5x7OynOfzv7OFQxNSYxVT2drc-4bAz9gghHiCiEp7eMYlJBIcvt6UtDtLVq2ofONkCTbBqIsWK7xYlfAOQQNuvS0BAkMSsIeGL3aBKZwesvboC-a9ov42g9Rht3PUWjd_7u64cN2KkBtQ0ycUQSMtMeByHTXmOADlok',
        dq: 'eSl3H7winLEDnhfISbqJPoZnBJT8BCGvgHzQp-ygHxmS0x8sQnfC5cRMl6u7XiGrNeDQID5bmU8viQIHeNoJjLsCgBcAiPnl3RqO7q2_mqkn3hXxsvdl_6xeLokMvtezwmhxEBkY2SnUzF7J1oUE9xT1FIl7I_EAUIgbelGcMgM',
        qi: 'RBfiAglAENmW_yvvzWEZAPxdteg3JHousk3qUibvguiTlpvLnn9m2jc_Nj91i9FyPoHrlQyzoLMVHIqKv9Ih9KWkosWhuKcs5Uhslu2GjubkEiLZN4madvyHqyUOvU_amXjboLf2mbrc3UjED2ds_jGSJYxD-NbXZPMzIoFZoW8',
      },
    ],
  ]),
  prod: new Map([
    [
      'v1.91.10',
      {
        use: 'enc',
        kty: 'RSA',
        kid: 'BVMheYSkpSUAzyQPpY4XqxijRlEIL-Zbt_GnKsMY97Y=',
        alg: 'RSA-OAEP',
        n: 'yWo87FikWCbKolCePWOuQJ5juv-Ea08AkdLE7g9uSY6UKXO8SdIzKyyJRZgqs7T4lKawoCVQqGisqQagqk9_rhO3pqWv_sGkCh3PmNsLvZJxMbX7bvglyIdLkKghfsjZcdbKjpV-YpKgbcFO_HF2Zfaa3hbTpQ3DxzdkU99gfQWMSlYbljqPr6_RScatggynwGCk6XuIBSZKAd0xeZzfXtFybbhFtVldDj7VQwmRL0hgK6tbQrs9atBJu0dTCjhvzcV9NtIPkiO8zIfCE2qGhPB-qXAwAiLW93l5xQt_g8h1utwATdyBYPve6PWoA6X7PdQacSKAfkSIKIa4YQHt3Q',
        e: 'AQAB',
        d: 'tJAJDdhpfJ1KCzk6os456LQVtA5dJ9YrLI9G_CPZOxgWuxKGOae3N301kq5XmcMjFiBZNzg8lr1ADEdkwUmDrQsAGOVwYXI3HNqcwOueGtStpWL_hPvw41Rm6cfQP1jPlr532FsscjIAoGQr6yPMgJwTOgY8tjsgx_dgedBHL8uw8lq6924eCiukF8_6YDgLL12iySTkkLt1LCgUWsdl_8fH5Dw_fDSi7UPODlELxMxXnbA7InHYLynwcwim1sHKonijSarg4GzZlz9Tp2UU3hRwnxzxDGnZxKuiyGEMepQ_Gt9hO3uirWnBrHrcJrRPvHgmAfB1-rbFSemcajBQAQ',
        p: '0RCd4qU3omHbYhVrlcQR93pZPIR-3nPMzaE419qm8-94Jodvqebu-3pMp2WiJKJHNSju8nnWKvM1Yp_7rH0FUYKjzKQIN-IEpUWmiDGxy3splDZDyJ6Xs2DjCRKVVzF8-xGN4PyQTThz7W9ZHOyxBQfhqp5f6S6swZQVOas2FwU',
        q: '9qH3DIW_WPr2z_TTe-yb9qe7wXaFqnMXpcGPbs1pFqDJpYDCCf3f7WvmNVC4LowQGl_X6LQQCoPdsXAZ5kZ4IcLAVwwIrl3LvJktK32j1PWEwqBKc3qSgIbyksVoZvI40pP6eqs-9y-6NomFo3vVxTJJkm22WyqWYaCCVr7xgvk',
        dp: 'LpmVl79b90X4sJQ1ttxNZOxQl7ywysTlEbCuCu8h552pGm115lkjS8qm62ksCx5g4OiO2l1t74TmkWU3o-r6FIEaIbMuYcZvYqdzx0fMaZ66Vd8CnOU8yy79bDhIMXdGdHAlP9EMGSpMLNB0_I2Fp6lqE63ZkxBkUYHAeWpAVEE',
        dq: 'R9cx8VHcRP0Fe9ni6IwpehWt2VK-6MGRt9TEBRCMdezsD-uLmgF7gtsVOZ6Dp_tgjW4xpDUfHxD-OLtgr_UC9UKXaEO3G6Nyv0MXJz33xQanX1H1neGsXwfwDNS37pTL_HriUW0kcDhU06IHbXGa-VAGokKXBcNH_rQUg1QnYXE',
        qi: 'wUD8PYFcdboj14zcC7bEijkeAleDfARCxwc9Htr5b6lPL2_KYHbrDbmxQm1UiLvIIUc9pok6YmTQO9W2-gKmPtkNrelMr0pUkxPibPy7ZOszd1oGTHPQ9grXapvVcqBviyD0-jdZjI1awoWm4UQz6hssB34XAkZOVynv8fX7U_8',
      },
    ],
  ]),
};

const appSecretDecoderImpl = {
  async decodeSecret(encodedSecret, coreVersion) {
    console.log(`encodedSecret: ${encodedSecret}`);

    const privateKeyMeta = getPrivateKeyMeta(coreVersion);

    console.log(`privateKeyMeta: ${JSON.stringify(privateKeyMeta)}`);

    return await decodeSecretJoseNode(encodedSecret, privateKeyMeta);
  },
};

async function decodeSecretJoseNode(encodedSecret, privateKeyMeta) {
  const privateKey = await joseNode.JWK.asKey(JSON.stringify(privateKeyMeta));
  console.log(`privateKey: ${JSON.stringify(privateKey)}`);

  const {plaintext: plaintextEncoded} = await joseNode.JWE.createDecrypt(
    privateKey,
  ).decrypt(encodedSecret);
  console.log(`plaintext encoded: ${JSON.stringify(plaintextEncoded)}`);

  const plaintText = new encoding.TextDecoder().decode(plaintextEncoded);
  console.log(`plaintext: ${plaintText}`);

  return plaintText;
}

function getPrivateKeyMeta(coreVersion) {
  let coreVersionPrivateKeyMap = Configs.isProduction
    ? coreVersionPrivateKey.prod
    : coreVersionPrivateKey.dev;
  let res = coreVersionPrivateKeyMap.get(coreVersion);
  if (!res) {
    console.log('version not found, fallback to closest previous version key');
    res = findPrivateKeyMetaOfClosestPreviousVersion(
      coreVersion,
      coreVersionPrivateKeyMap,
    );
  } else {
    console.log('version found');
  }
  return res;
}

// if private key of given version not found, fallback to private key of closest previous version
function findPrivateKeyMetaOfClosestPreviousVersion(
  coreVersion,
  coreVersionPrivateKeyMap,
) {
  const coreVersions = Array.from(coreVersionPrivateKeyMap.keys())
    .map(parseVersion)
    .sort(compareVersion);
  console.log(`coreVersions: ${JSON.stringify(coreVersions)}`);
  const coreVersionParsed = parseVersion(coreVersion);
  const closestLessVersion = binarySearchClosestLess(
    coreVersionParsed,
    0,
    coreVersions.length - 1,
    coreVersions,
  );
  console.log(`closestLessVersion: ${JSON.stringify(closestLessVersion)}`);
  if (!closestLessVersion) {
    return undefined;
  }
  const closestLessVersionFormatted = `v${closestLessVersion.join('.')}`;
  return coreVersionPrivateKeyMap.get(closestLessVersionFormatted);
}

function binarySearchClosestLess(coreVersion, start, end, coreVersions) {
  // console.log(`searching closest less for coreVersion:${coreVersion}, start:${start}, end:${end}`)
  if (start > end) {
    return undefined;
  }
  if (start === end) {
    if (compareVersion(coreVersions[start], coreVersion) === 1) {
      return undefined;
    }
    return coreVersions[start];
  }

  const mid = Math.ceil((start + end) / 2);
  const compareResult = compareVersion(coreVersions[mid], coreVersion);
  // console.log(`compare ${coreVersions[mid]} and ${coreVersion}: ${compareResult}`)
  if (compareResult === 1) {
    return binarySearchClosestLess(coreVersion, start, mid - 1, coreVersions);
  } else {
    return binarySearchClosestLess(coreVersion, mid, end, coreVersions);
  }
}

// "v1.87.1" -> [1,87,1]
function parseVersion(version) {
  return version
    .substring(1)
    .split('.')
    .map(versionPathString => {
      return parseInt(versionPathString);
    });
}

// verion param ex: [1,88,1]
// return value: 1(greater), 0(equal), -1(less)
// ex: compareVersion([1,88,1], [1,87,2]) return 1
function compareVersion(version1, version2) {
  for (let i = 0; i < version1.length; i++) {
    if (i >= version2.length || version1[i] > version2[i]) {
      return 1;
    } else if (version1[i] < version2[i]) {
      return -1;
    }
  }
  if (version1.length === version2.length) {
    return 0;
  }
  return -1;
}

export default appSecretDecoderImpl;
