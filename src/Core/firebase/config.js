import { decode, encode } from 'base-64';
import './timerConfig';
global.addEventListener = (x) => x;
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDR_qAiqhqr17hVJ4YnyQZmWH5ZRlEPtww",
  authDomain: "carrybooh-8941d.firebaseapp.com",
  databaseURL: "https://carrybooh-8941d-default-rtdb.firebaseio.com",
  projectId: "carrybooh-8941d",
  storageBucket: "carrybooh-8941d.appspot.com",
  messagingSenderId: "976753058160",
  appId: "1:976753058160:web:31c7db7717c7ebe9772fb5",
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export { firebase };
