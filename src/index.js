import React, { useEffect } from 'react';
import {
  StatusBar,
  LogBox,
  Linking,
  Alert,
  BackHandler,
  Platform,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { THEME } from './utils/colors';
import RootNavigation from './navigation';
import store from './redux/store';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import { serviceConst } from './services/serviceConstant';
import {
  requestTrackingPermission,
  getTrackingStatus,
} from 'react-native-tracking-transparency';
import { withIAPContext } from 'react-native-iap';
import crashlytics from '@react-native-firebase/crashlytics';
import OneSignal from 'react-native-onesignal';
import { MenuProvider } from 'react-native-popup-menu';

const App = () => {
  // OneSignal Init Code
  // OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId(
    'f25aab86-cefa-4fae-9ace-8405eb75a6ee'
    // Platform.OS === 'ios'
    //   ? 'f25aab86-cefa-4fae-9ace-8405eb75a6ee'
    //   : 'c5d1a9ff-d08a-490c-a93d-3a87e80bda90',
  );

  // Prompt for push on iOS
  OneSignal.promptForPushNotificationsWithUserResponse((response) => {
    // console.log('Prompt response:', response);
  });

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    (notificationReceivedEvent) => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      );
      let notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler((notification) => {
    console.log('OneSignal: notification opened:', notification);
  });

  LogBox.ignoreAllLogs();

  useEffect(() => {
    crashlytics().log(`User opened brownce application in ${Platform.OS}, and application is mounted`);
    checkPermission();
    _checkTracking();
  }, []);

  const checkPermission = () => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled != -1) getToken();
        else requestPermission();
      })
      .catch((error) => {
        console.log('FCMTOKEN==<<', error);
      });
  };

  const _checkTracking = async () => {
    const trackingStatus = await getTrackingStatus();
    if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
      console.log('Tracking permission', trackingStatus);
    } else if (trackingStatus === 'denied') {
      _openSettings();
    } else {
      const res = await requestTrackingPermission();
      if (res !== 'authorized') {
        _openSettings();
      }
    }
  };

  const _openSettings = () => {
    return;
    console.log('Tracking permission denied');
    Alert.alert(
      'App Tracking Permission',
      'This helps us suggest products we think you’ll love.',
      [
        {
          text: 'Cancel',
          onPress: () => BackHandler.exitApp(),
          style: 'cancel',
        },
        { text: 'Settings', onPress: () => Linking.openSettings() },
      ],
    );
  };

  const getToken = async () => {
    messaging()
      .getToken()
      .then(async (fcmToken) => {
        serviceConst.deviceToken = fcmToken;
        await AsyncStorage.setItem('fcmToken', fcmToken);
      });
  };

  const requestPermission = async () => {
    try {
      const authorizationStatus = await messaging().requestPermission();
      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED)
        getToken();
      else if (authorizationStatus === messaging.AuthorizationStatus.DENIED)
        console.log('Permission denied by user');
      else getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  };

  return (
    <Provider store={store}>
      <MenuProvider>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor={THEME} />
        <RootNavigation />
      </SafeAreaProvider>
      </MenuProvider>
    </Provider>
  );
};

export default withIAPContext(App);
