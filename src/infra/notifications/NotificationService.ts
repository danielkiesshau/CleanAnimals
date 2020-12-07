import PushNotification from 'react-native-push-notification';
import './config';
class NotificationService {
  static localNotification(title: string, message: string) {
    PushNotification.localNotification({
      channelId: '1k2m3klmasklmdkasdif908912u3hpy8zsdp',
      message,
      title,
    });
  }
}

export default NotificationService;