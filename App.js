//import { StatusBar } from 'expo-status-bar';
//import MapScreen from './src/screens/MapScreen';
//import { createAppContainer } from 'react-navigation';
import React, { useEffect, useState } from 'react'
import 'react-native-gesture-handler';
import { firebase } from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import RegistrationScreen from './src/screens/RegistrationScreen/RegistrationScreen';
//import MapScreen from './src/screens/MapScreen';
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

 
/* KEEPS LOGGED IN
  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

   
  if (loading) {
    return (
      <></>
    )
  }
  */

  //janky workaround for home screen...had to add it as a default screen in the else section.
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name="Home" component={HomeScreen}>
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Home" component={HomeScreen}/> 
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*const navigator = createStackNavigator(
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
*/
