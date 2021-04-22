import { StatusBar } from 'expo-status-bar';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MapScreen from './src/screens/MapScreen';
import ToiletScreen from './src/screens/ToiletScreen';

const navigator = createStackNavigator(
  {
     Map: MapScreen,
     Toilet: ToiletScreen
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
