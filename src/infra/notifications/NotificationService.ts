import PushNotification from 'react-native-push-notification';
import { API_KEY, NOTIFICATION_ICON_URL } from '@env';
import './config';

class NotificationService {
  static localNotification(title: string, message: string) {
    PushNotification.localNotification({
      channelId: API_KEY,
      largeIconUrl: NOTIFICATION_ICON_URL,
      message,
      title,
    });
  }
}

export default NotificationService;
