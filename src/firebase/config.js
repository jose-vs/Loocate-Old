import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: 'AIzaSyCUTkws9SUpPMfz_Vw9kuTLwRh9A3JR4d8',
  authDomain: 'loocate-ba926.firebaseapp.com',
  //databaseURL: 'https://loocate-ba926.firebaseio.com', apparently firestore doesn't need this
  projectId: 'loocate-ba926',
  storageBucket: 'loocate-ba926.appspot.com',
  messagingSenderId: '83797559348', //might not need
  appId: '1:83797559348:android:33341da627f0f24977e261',
=======
  apiKey: 'AIzaSyATae8ngLuOkMgrH0pgORK43el03rNENxc',
  //authDomain: 'your-auth-domain-b1234.firebaseapp.com', not needed for firestore
  //databaseURL: 'https://your-database-name.firebaseio.com', not needed for firestore
  projectId: 'ejectloocate',
  storageBucket: 'ejectloocate.appspot.com',
  //messagingSenderId: '12345-insert-yourse',
  appId: '1:750662302801:android:52c3431cb0a1fe5e030c70',
>>>>>>> ff6705bf54a091174fb4448665ca169f5f5875a9
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };