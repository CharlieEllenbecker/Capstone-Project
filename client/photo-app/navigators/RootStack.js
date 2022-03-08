import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors } from './../components/styles';
const { primary, darkBrick, brick, lightBrick, secondary, tetriary } = Colors;

import Login from './../screens/login';
import Signup from './../screens/signup';
import HomeScreen from '../screens/HomeScreen';
import DrawerNavigator from './DrawerNavigator';
import MainTabScreen from './MainTabScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      {/* Logged in ? DrawerNavigator : 'Login' */}
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default RootStack;
