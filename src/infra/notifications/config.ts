import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
});

PushNotification.createChannel(
  {
    channelId: '1k2m3klmasklmdkasdif908912u3hpy8zsdp',
    channelName: 'Local channel',
  },
  (created) => console.log(`createChannel returned '${created}'`),
);
