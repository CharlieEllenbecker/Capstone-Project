import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors } from './../components/styles';
import MainTabScreen from './MainTabScreen';
const { primary, darkBrick, brick, lightBrick, secondary, tetriary } = Colors;

// import Login from './../screens/Login';
// import Signup from '../screens/Signup';
// import DrawerNavigator from './DrawerNavigator.js';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: darkBrick,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
        initialRouteName="MainTabScreen"
      >
        {/* <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup}/> */}
        <Stack.Screen name="MainTabScreen" component={MainTabScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
