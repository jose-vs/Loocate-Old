import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyATae8ngLuOkMgrH0pgORK43el03rNENxc',
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