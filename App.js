import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { 
    createStackNavigator, 
    TransitionPresets, 
    CardStyleInterpolators 
} from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import AccountScreen from "./src/screens/AccountScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import ListScreen from "./src/screens/ListScreen";
import MapScreen from "./src/screens/MapScreen";
import ReviewTypeScreen from './src/screens/ReviewTypeScreen';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        
      >
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}