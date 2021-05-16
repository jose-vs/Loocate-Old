import { registerRootComponent } from 'expo';
export { default as LoginScreen } from './src/screens/LoginScreen'
export { default as AccounteScreen } from './src/screens/AccountScreen'
export { default as MapScreen } from './src/screens/MapScreen'
export { default as RegistrationScreen } from './src/screens/RegistrationScreen'
export { default as ReviewTypeScreen } from './src/screens/ReviewTypeScreen'
export { default as DisplayReviewsScreen} from './src/screens/DisplayReviewsScreen'
import App from './App';
import _ from 'lodash';

//fix for timer warning in login screens (without editing to edit a file in node modules, which would need to be done every time you clone)
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
