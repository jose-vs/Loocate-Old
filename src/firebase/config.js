import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCUTkws9SUpPMfz_Vw9kuTLwRh9A3JR4d8',
  authDomain: 'loocate-ba926.firebaseapp.com',
  //databaseURL: 'https://loocate-ba926.firebaseio.com', apparently firestore doesn't need this
  projectId: 'loocate-ba926',
  storageBucket: 'loocate-ba926.appspot.com',
  messagingSenderId: '83797559348', //might not need
  appId: '1:83797559348:android:33341da627f0f24977e261',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };