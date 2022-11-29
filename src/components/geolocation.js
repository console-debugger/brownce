import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export const getCurrentLocation = () => {
  return new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      //Geolocation.requestAuthorization()
      Geolocation.getCurrentPosition(
        position => { resolve({ "status": true, payload: position.coords }) },
        error => { reject({ "status": false, payload: error }) },
        { enableHighAccuracy: false, timeout: 2000 },
      );
    } else {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,)
      console.log(granted);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
          .then(async data => {
            if (data == "enabled" || data == "already-enabled") {
              Geolocation.getCurrentPosition((result) => { resolve({ "status": true, payload: result.coords }) }, (e) => { console.log("error", e) }, { timeout: 20000 });
            }
          }).catch(err => resolve({ "status": false, payload: err }));
      } else { resolve({ "status": false, payload: {} }) }
    }
  })
}