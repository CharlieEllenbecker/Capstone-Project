import 'react-native-gesture-handler';
import React from 'react';
import RootStack from './navigators/RootStack';
import store from './state/store';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
export default function App() {
  return (
    <Provider store={store()}>
      <RootStack />
    </Provider>
  );
}
registerRootComponent(App);