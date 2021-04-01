import { createAppContainer, createStackNavigator } from 'react-navigation';
import MapScreen from './src/screens/MapScreen';
import { firebaseConfig } from './config/firebase.js';
import firebase from 'firebase';

import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGE_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID
} from 'react-native-dotenv'

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
  measurementId:MEASUREMENT_ID
}

//initalize Firebase 
if (!firebase.apps.length) { //Checks if firebase has already been initialized
  firebase.initializeApp(firebaseConfig);
}
const navigator = createStackNavigator(
  {
    Map: MapScreen,
  }, 
  { 
    InitialRouteName: 'Map',
    headerMode: 'none',
    navigationOptions: {
    headerVisible: false,
    }
  }
);

export default createAppContainer(navigator); 
