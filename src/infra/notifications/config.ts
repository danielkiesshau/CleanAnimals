import PushNotification from 'react-native-push-notification';
import { API_KEY } from '@env';

PushNotification.configure({
  onRegister: function () {
    // console.log('TOKEN:', token);
  },

  onNotification: function () {
    // console.log('NOTIFICATION:', notification);
    // process the notification
    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
});

PushNotification.createChannel(
  {
    channelId: API_KEY,
    channelName: 'Local channel',
  },
  () => {
    // console.log(`createChannel returned '${created}'`)
  },
);
