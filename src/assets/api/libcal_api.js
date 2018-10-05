import axios from 'axios';
import { AsyncStorage } from "react-native"

import keys from 'api/auth.json';


// Start LibCal by authenticating
export function lib_Auth(callback) {
  var authConfig = {
    method: 'POST',
    url: 'https://api2.libcal.com/1.1/oauth/token',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      'client_id': keys.clientId,
      'client_secret': keys.clientSecret,
      'grant_type': 'client_credentials'
    }
  }

  axios(authConfig)
  .then(async (res) => {
    lib_SetBearer(res.data, () => {
      response = { "auth": true, "token": res.data.access_token };
      callback(null, response);
    })
  })
  .catch((error) => {
    callback(error);
  })
}



// [PUBLIC] getbearer
export async function lib_GetBearer(callback) {
  try {
    var data = await AsyncStorage.getItem('BEARER');
    if (data !== null){
      callback(null, data)
    } else {
      // nope, need to auth
      callback("Need to call lib_Auth() first!")
    }
  } catch (error) {
    console.log(error);
  }
}



// [PRIVATE] setbearer
async function lib_SetBearer(value, callback) {
  try {
    console.log("setting bearer "+value.access_token)
    await AsyncStorage.setItem('BEARER', value.access_token);
    callback({ "success": true });
  } catch (error) {
    console.log(error)
  }
}


/*
Storage Example

try {
  var value = await AsyncStorage.getItem('BEARER');
  if (value == null) {
    console.log("no saved key")
  }
} catch ( error ) {
  console.log(error);
}
*/
