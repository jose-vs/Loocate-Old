<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MapScreen from './src/screens/MapScreen';
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
=======
//import { StatusBar } from 'expo-status-bar';
//import { createAppContainer } from 'react-navigation';
import React, { useEffect, useState } from 'react'
import 'react-native-gesture-handler';
import { firebase } from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import AccountScreen from './src/screens/AccountScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import MapScreen from './src/screens/MapScreen';
>>>>>>> ff6705bf54a091174fb4448665ca169f5f5875a9
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

<<<<<<< HEAD
=======
 
//stay logged in
/*
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
>>>>>>> ff6705bf54a091174fb4448665ca169f5f5875a9
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
<<<<<<< HEAD
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
=======
          <Stack.Screen name="Account" component={AccountScreen}>
            {props => <MapScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Map" component={MapScreen}/> 
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} /> 
            <Stack.Screen name="Account" component={AccountScreen}/> 
>>>>>>> ff6705bf54a091174fb4448665ca169f5f5875a9
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

<<<<<<< HEAD
/*
const navigator = createStackNavigator(
=======
/*const navigator = createStackNavigator(
>>>>>>> ff6705bf54a091174fb4448665ca169f5f5875a9
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
<<<<<<< HEAD
*/
=======
*/
>>>>>>> ff6705bf54a091174fb4448665ca169f5f5875a9
