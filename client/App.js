import 'react-native-gesture-handler';
import React from 'react';
import RootStack from './navigators/RootStack';
import { registerRootComponent } from 'expo';
export default function App() {
  return (<RootStack />);
}
registerRootComponent(App);