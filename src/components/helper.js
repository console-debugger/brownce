import { Platform, Dimensions, Keyboard, Alert, PermissionsAndroid } from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import { Share } from 'react-native';
import { serviceConst } from '../services/serviceConstant';
import { TestIds } from 'react-native-google-mobile-ads';
import { ROLE_TYPES } from '../utils/roleType';
import moment from 'moment';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from 'react-native-geolocation-service';
import analytics from '@react-native-firebase/analytics';

const Screen = Dimensions.get('window');

export const SCREEN_WIDTH = Screen.width;

export const SCREEN_HEIGHT = Screen.height;

export const isIOS = Platform.OS === 'ios';

export const isAndroid = Platform.OS === 'android';

export const ADMOB_BANNER_UNIT_ID = __DEV__
  ? TestIds.BANNER
  : isIOS
    ? 'ca-app-pub-6632433436195884/3798197132'
    : 'ca-app-pub-6632433436195884/8113147983';

export const ADMOB_INTERSTITIAL_UNIT_ID = __DEV__
  ? TestIds.INTERSTITIAL
  : isIOS
    ? 'ca-app-pub-6632433436195884/8737934139'
    : 'ca-app-pub-6632433436195884/1705621925';

export const dismissKeyboard = () => Keyboard.dismiss();

export const isCustomer = () => {
  if (serviceConst['role'] == ROLE_TYPES.CUSTOMER) return true;
  else return false;
};

export const isProvider = () => {
  if (serviceConst['role'] == ROLE_TYPES.PROVIDER) return true;
  else return false;
};

export const onShare = async (link) => {
  try {
    const result = await Share.share({
      message: `${link}`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

// https://brownceapp.page.link/8YMeAr8SciKQGwJ28

export async function onShareHandler(userId, profileType) {
  // const profileType = isCustomer() ? 'customer' : 'provider';
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      longDynamicLink: `https://brownceapp.page.link/?link=https://www.brownceapp.com/profile-id/${profileType}/${userId}&apn=com.browncecustomer&isi=1539118657&ibi=com.brownceapp.brownce`,
    }),
  };
  fetch(
    'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyBGC2LZ3gHpHOIoDzrbEt8y6tabEAOhu1s',
    requestOptions,
  )
    .then((response) => response.json())
    .then(async (data) => {
      console.log('shoretLink==>', data)
      return await onShare(data?.shortLink)
    });
}

export const showToast = (message, isLong) => {
  if (isLong) {
    return Toast.show(message, Toast.LONG);
  }
  return Toast.show(message);
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(`Error in storing ${key} to localstotage.`);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`${key}`);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(`Error in getting ${key} from localstotage.`);
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(`${key}`);
  } catch (e) {
    console.log(`Error in removing ${key} from localstotage.`);
  }
};

export const multiRemoveData = async (keys) => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.log(`Error in removing ${keys.toString()} from localstotage.`);
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(`Error in clearing localstotage.`);
  }
};

export const MyAlert = (title, message, onYesPress, onCancelPress) => {
  Alert.alert(title || '', message || '', [
    {
      text: 'Cancel',
      onPress: onCancelPress
        ? onCancelPress
        : () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    { text: 'OK', onPress: onYesPress },
  ]);
};

const chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export const Base64 = {
  btoa: (input: string = '') => {
    let str = input;
    let output = '';

    for (
      let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || ((map = '='), i % 1);
      output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
    ) {
      charCode = str.charCodeAt((i += 3 / 4));

      if (charCode > 0xff) {
        throw new Error(
          "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.",
        );
      }

      block = (block << 8) | charCode;
    }

    return output;
  },

  atob: (input: string = '') => {
    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
      throw new Error(
        "'atob' failed: The string to be decoded is not correctly encoded.",
      );
    }
    for (
      let bc = 0, bs = 0, buffer, i = 0;
      (buffer = str.charAt(i++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  },
};

export const getDate = (date_time) => {
  const startWeekDate = getStartEndWeekDays().start.format('YYYY-MM-DD');
  const endWeekDate = getStartEndWeekDays().end.format('YYYY-MM-DD');
  const formatDate = getFormatedDate(date_time);
  if (moment(formatDate).isSame(Today())) {
    const localTime = convertToLocal(date_time);
    const notifyToday = hourDiff(localTime);
    return notifyToday;
  }
  // else {
  //     const localTime = convertToLocal(date_time)
  //     return moment(localTime).format('DD MMM')
  // }
  else if (moment(formatDate).isSame(Yesterday())) {
    return 'Yesterday';
  } else if (
    moment(formatDate).isSameOrAfter(startWeekDate) &&
    moment(formatDate).isSameOrBefore(endWeekDate)
  ) {
    return weekDayName(formatDate);
  } else if (moment(formatDate).isBefore(startWeekDate)) {
    return daysAgoFormat(date_time);
  }
};

export const getStartEndWeekDays = () => {
  const from_date = moment().startOf('week');
  const to_date = moment().endOf('week');
  return { start: from_date, end: to_date };
};

export const getFormatedDate = (date) => {
  const localTime = convertToLocal(date);
  return moment(localTime).format('YYYY-MM-DD');
};

export const convertToLocal = (dateTime) => {
  const date = moment.utc(dateTime).format('YYYY-MM-DD HH:mm:ss');
  const stillUtc = moment.utc(date).toDate();
  const local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
  return local;
};

export const Today = () => {
  const today = moment().format('YYYY-MM-DD');
  return today;
};

const hourDiff = (end) => {
  let hour, minute, second;
  const formatToday = moment().format('MM/DD/YYYY hh:mm:ss A');
  end = moment(end).format('MM/DD/YYYY hh:mm:ss A');
  const startHour = moment(formatToday);
  const endHour = moment(end);
  hour = startHour.diff(endHour, 'h');
  minute = startHour.diff(endHour, 'm');
  second = startHour.diff(endHour, 's');
  if (hour > 1) return `${hour} hr ago`;
  else if (hour <= 0 && minute >= 1) return `${minute} min ago`;
  else if (hour <= 0 && minute <= 0 && second <= 59)
    return second == 0 ? 'now' : `${second} s ago`;
};

export const Yesterday = () => {
  const yesterday = moment().add(-1, 'days').format('YYYY-MM-DD');
  return yesterday;
};

export const DayBeforeYesterday = () => {
  const yesterday = moment().add(-2, 'days').format('YYYY-MM-DD');
  return yesterday;
};

export const weekDayName = (date) => {
  return moment(date).format('ddd');
};

export const daysAgoFormat = (dateTime) => {
  const currentDate = moment(); // today
  const secondDate = moment(dateTime); // target date
  const difference = currentDate.diff(secondDate, 'days');
  if (difference <= 30) {
    return difference + 'd';
  } else if (difference > 30 && difference < 365) {
    const monthCount = difference / 30;
    return `${parseInt(monthCount)} mo`;
  } else if (difference >= 365) {
    const yearCount = difference / 365;
    return parseInt(yearCount) + 'y';
  }
};

export const LocationPermission = async () => {
  if (isAndroid) {
    return RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(async resp => {
        if (resp === 'enabled' || resp === 'already-enabled') {
          if (isAndroid && Platform.Version < 23) {
            return true;
          }

          const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
          if (hasPermission) return true;

          const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
          if (status === PermissionsAndroid.RESULTS.GRANTED) return true;
          if (status === PermissionsAndroid.RESULTS.DENIED) {
            showToast('Location permission denied.');
          } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            showToast('Location permission revoked.');
          }
          return false;
        }
      })
      .catch((err) => {
        if (err['code'] === 'ERR00') {
          showToast('Please enable your location for better experience')
          return false
        }
        else if (err['code'] === 'ERR01') {
          showToast('Please enable your location manually from setting')
          return false
        }
        else {
          showToast(err.message)
          return false
        }
      })
  }
  else {
    const hasLocationPermission = await Geolocation.requestAuthorization('always')
    if (hasLocationPermission == 'denied' || hasLocationPermission == 'disabled' || hasLocationPermission == 'restricted') {
      return false
    }
    return true
  }
}

export const getCurrentLocationCoordinate = async () => {
  return new Promise(async (resolve, reject) => {
    const hasLocationPermission = await LocationPermission();
    if (hasLocationPermission) {
      try {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log('position=>', position)
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            }
            resolve(location)
          },
          (error) => {
            console.log('location error==>', error)
            showToast(error['message'])
            reject({ latitude: null, longitude: null, error: error['message'] })
          },
          { timeout: 20000, maximumAge: 10000 }
        )
      } catch (err) {
        console.log('location error==>1', err)
        showToast('Please enable your location for better experience')
        reject({ latitude: null, longitude: null, error: 'Please enable your location for better experience' })
      }
    }
    else {
      console.log('location error==>2', err)
      showToast('Please enable your location for better experience')
      reject({ latitude: null, longitude: null, error: 'Please enable your location for better experience' })
    }
  })

}

export const locationMapping = (detail) => {
  if (detail?.City && detail?.State) return `${detail?.City}, ${detail?.State}`
  else if (detail?.City && !detail?.State) return detail?.City
  else if (!detail?.City && detail?.State) return detail?.State
  else return '--'
}

export const validateUrl = url => {
  if (url) {
    if (url?.includes('https://') || url?.includes('http://')) return url
    else return `https://${url}`
  }
  else return null
}

export const logAnalyticEvent = (eventName, data) => {
  if (typeof eventName == 'string' && eventName.trim().length)
    analytics().logEvent(eventName, data)
}

export const checkDialCodePlusSymbol = dialCode => {
  if (dialCode && dialCode.includes('+')) return dialCode
  else if (dialCode) return `+${dialCode}`
  else return ''
}