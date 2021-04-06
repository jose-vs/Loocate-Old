import { StatusBar } from 'expo-status-bar';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MapScreen from './src/screens/MapScreen';
import BottomSheetTest from './src/screens/BottomSheetTest';

const navigator = createStackNavigator(
  { 
      Map: MapScreen,
      BottomSheet: BottomSheetTest
  }, 
  { 
      InitialRouteName: 'BottomSheetTest',
      headerMode: 'none',
      navigationOptions: {
      headerVisible: false,
      }
  }
);

export default createAppContainer(navigator); 