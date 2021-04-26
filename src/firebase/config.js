import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import { MAP_API_KEY } from "@env";

const firebaseConfig = {
  apiKey: MAP_API_KEY,
  //authDomain: 'your-auth-domain-b1234.firebaseapp.com', not needed for firestore
  //databaseURL: 'https://your-database-name.firebaseio.com', not needed for firestore
  projectId: 'ejectloocate',
  storageBucket: 'ejectloocate.appspot.com',
  //messagingSenderId: '12345-insert-yourse',
  appId: '1:750662302801:android:52c3431cb0a1fe5e030c70',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };