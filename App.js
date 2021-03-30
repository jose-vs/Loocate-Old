import { StatusBar } from 'expo-status-bar';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MapScreen from './src/screens/MapScreen';

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
