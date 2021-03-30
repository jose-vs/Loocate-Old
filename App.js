import { StatusBar } from 'expo-status-bar';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MapScreen from './src/screens/MapScreen';
import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase'

//initalize Firebase 
if (!firebase.apps.length) { //Checks if firebase has already been initialized
  firebase.initializeApp(ApiKeys.FirebaseConfig);
}

const navigator = createStackNavigator(
  {
    Map: MapScreen
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
