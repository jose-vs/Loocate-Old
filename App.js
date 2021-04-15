import { StatusBar } from 'expo-status-bar';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MapScreen from './src/screens/MapScreen';
import TestScreen from './src/Test/TestScreen';


const navigator = createStackNavigator(
  {
     //Map: MapScreen,
     Test: TestScreen
  }, 
  { 
    InitialRouteName: 'Test',
    headerMode: 'none',
    navigationOptions: {
    headerVisible: false,
    }
  }
);

export default createAppContainer(navigator); 
