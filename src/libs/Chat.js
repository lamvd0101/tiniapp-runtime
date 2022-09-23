import {NativeModules, Platform} from 'react-native';

import AppProps from '../app.props';
import {AppError} from '../models';
import {getChatInfo} from '../services/chat';
import Auth from './Auth';

export default class Chat {
  openChatDetail({appId = '', initMessage = '', attachment = {}}) {
    // attachment: {thumbnailUrl, text, subText} https://docs.tiki.com.vn/display/SPT/Chat+attachment+data+structure
    return new Promise(async (resolve, reject) => {
      try {
        const auth = new Auth();
        await auth._getAuthData();

        const props = new AppProps();
        const customerId = props.accountInfo.customerId || '';

        const chatInfo = await getChatInfo(
          appId,
          props.accountInfo?.accessToken,
        );
        const bizId = chatInfo?.business_id;
        if (!bizId) {
          throw new Error('');
        }
        const channelId = `${customerId}_${bizId}`;

        let openChatDetail;
        let args = [];
        if (Platform.OS === 'android') {
          openChatDetail = NativeModules.TikiChat?.openChatDetail;
          args = [channelId, initMessage, JSON.stringify(attachment)];
        } else {
          openChatDetail = NativeModules.Native?.goToChannelDetail;
          args = [
            channelId,
            null,
            null,
            initMessage,
            JSON.stringify(attachment),
          ];
        }

        console.log('channelId', args, openChatDetail);

        openChatDetail?.(...args);
        resolve({});
      } catch (error) {
        reject(new AppError(400, 'Chat failed.'));
      }
    });
  }
}
