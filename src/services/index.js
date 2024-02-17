import {method, serviceConst, serviceError} from './serviceConstant';
import {formDataHeader, GOOGLE_API_KEY, jsonHeader, REVERSE_GEOCODE_URL} from './serviceConfig';
import {logout} from '../navigation/rootNav';
import io from 'socket.io-client';
export const socket = io('http://54.160.37.157:3007/');

const apiRequest = (body, URL, apiMethod, isMedia) => {
  console.log('asdasd==>0',URL)
  console.log('asdasd==>1',body)
  console.log('asdasd==>2',apiMethod)
  const init =
    apiMethod === method.POST
      ? {
          method: apiMethod,
          headers: isMedia
            ? {...formDataHeader, token: serviceConst['token']}
            : {...jsonHeader, token: serviceConst['token']},
          body: isMedia ? body : JSON.stringify(body),
        }
      : {
          method: apiMethod,
          headers: isMedia
            ? {...formDataHeader, token: serviceConst['token']}
            : {...jsonHeader, token: serviceConst['token']},
        };

  // console.log(URL, 'Request -->>', init);
  return fetch(`${URL}`, init)
    .then((resp) =>
      resp.json().then((resp) => {
        console.log(URL, 'Response -->>', JSON.stringify(resp));
        const jsonResp = {
          status: resp.Status,
          data: resp,
          message: resp.Message,
          result: resp.result,
        };
        if (resp.Status === 401) {
          logout();
        }
        return jsonResp;
      }),
    )
    .catch((error) => {
      console.log(URL, 'error -->>', error);
      const catchErr = {
        status: 900,
        message: serviceError['NETWORK_ERROR'],
        result: {},
        data: {},
      };
      return catchErr;
    });
};

export default apiRequest;


const reverseGeocode = (coordinates) => {
  return fetch(`${REVERSE_GEOCODE_URL}${coordinates.latitude},${coordinates.longitude}&key=${GOOGLE_API_KEY}`).then(resp => resp.json()
      .then(data => {
          // console.log('reverse==>', data)
          const jsonResp = {
              status: data.status,
              data: data,
              result: data.results,
          }
          return jsonResp
      }))
      .catch((error) => {
          // console.log('catch Error of place details==>', error)
          const catchErr = {
              status: 900,
              jsonData: { message: serviceError['NETWORK_ERROR'] }
          }
          return catchErr
      })
}

export {reverseGeocode}