/** @format */

import 'babel-polyfill'
import './shim';
import {AppRegistry, YellowBox} from 'react-native';
// import App from './App';
import App from './app2';
import {name as appName} from './app.json';
YellowBox.ignoreWarnings = ([
  'require.js:122 Require cycle',
]);

AppRegistry.registerComponent(appName, () => App);
