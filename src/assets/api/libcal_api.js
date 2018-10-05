/*
  Libcal API implementation (ES6)
  By: Andrew "Azure-Agst" Augustine

Yeah, yeah, I know it's one long file. Looks bad, etc, etc.
I'd have modularized this if it wasn't so much of a pain. Sorry!
*/

import axios from 'axios';
import { AsyncStorage } from "react-native";

import keys from 'api/auth.json';

const lid = '3929';
var bearer = undefined;

// [PUBLIC] Auth
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
      bearer = res.data.access_token;
      response = { "auth": true, "token": res.data.access_token };
      callback(null, response);
    })
  })
  .catch((error) => {
    callback(error);
  })
}

// [PUBLIC] GetBearer
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

// [PRIVATE] SetBearer
async function lib_SetBearer(value, callback) {
  try {
    console.log("setting bearer "+value.access_token)
    await AsyncStorage.setItem('BEARER', value.access_token);
    callback({ "success": true });
  } catch (error) {
    console.log(error)
  }
}

// [PUBLIC] GetCategories
export function lib_GetCategories(callback) {
  if (bearer == undefined) callback("Haven't authenticated yet!");
  axios.get('https://api2.libcal.com/1.1/space/categories/'+lid, {
    headers: { "Authorization": "Bearer "+bearer }
  })
  .then((response) => {
    callback(null, response.data);
  })
}
