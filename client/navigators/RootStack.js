import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors } from '../components/styles';
const { primary, darkBrick, brick, lightBrick, secondary, tetriary } = Colors;

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import MainTabScreen from './MainTabScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import DrawerNavigator from './DrawerNavigator.js';
import LocationScreen from '../screens/LocationScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName="Login"
                >
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup}/>
                <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options = {{ headerShown: false }}/>
                <Stack.Screen name="LocationScreen" component={LocationScreen} options = {{ headerShown: true, headerTitle: '', headerStyle: { backgroundColor: 'transparent'}, headerLeftContainerStyle: { paddingLeft: 20 }, headerTintColor: '#000000', headerTransparent: true, headerBackVisible: true}}/>
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} options = {{headerShown: false}}/>
                <Stack.Screen name="HomeScreen" component={MainTabScreen}/>
                <Stack.Screen name="SettingsScreen" component={SettingsScreen}/>
                <Stack.Screen name="Home" component={HomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;
