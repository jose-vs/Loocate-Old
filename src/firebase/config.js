import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import { FIREBASE_API_KEY } from "@env";
import { FIREBASE_STORAGE_BUCKET } from "@env";
import { FIREBASE_PROJECT_ID } from "@env";
import { FIREBASE_APP_ID } from "@env";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  projectId: FIREBASE_STORAGE_BUCKET,
  storageBucket: FIREBASE_PROJECT_ID,
  appId: FIREBASE_APP_ID
  //authDomain: 'your-auth-domain-b1234.firebaseapp.com', not needed for Firestore
  //databaseURL: 'https://your-database-name.firebaseio.com', not needed for Firestore
  //messagingSenderId: '12345-insert-yourse', not needed for Firestore
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export { firebase };