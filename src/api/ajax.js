import axios from 'axios'
import store from '@/vuex/store.js'
import {
  IP,
  ServerPort as PORT
} from './env.js'
axios.interceptors.request.use(
  config => {
      if (store.state.token) {
          if(!config.noToken){
              config.headers._token = store.state.token;
          }
      }else{
      }
      return config;

  })
export default function fetch(type, path, params) {
  let contentTpye = 'application/json'
  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url: IP + ':' + PORT + path,
      data: params,
      headers: {
        'Content-Type': contentTpye
      }
    }).then(response => {
      resolve(response);
    }).catch((error, res) => {
      reject(error);
    })
  })
}