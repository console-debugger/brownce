import PushNotification from "react-native-push-notification"

export const configPushNotifications = () => {
    PushNotification.configure({
        onNotification: function (notification) {
            if (notification?.['userInteraction']) {
                console.log('notification pressed')
            }
        },
        popInitialNotification: true,
    });
};