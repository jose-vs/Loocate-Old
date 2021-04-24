import { registerRootComponent } from 'expo';
export { default as LoginScreen } from './src/screens/LoginScreen/LoginScreen'
export { default as HomeScreen } from './src/screens/HomeScreen/HomeScreen'
export { default as MapScreen } from './src/screens/MapScreen'
export { default as RegistrationScreen } from './src/screens/RegistrationScreen/RegistrationScreen'
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
