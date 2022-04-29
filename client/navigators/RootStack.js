import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons';
import { View, TouchableOpacity, Button, Text } from 'react-native';
import { Colors } from '../components/styles';
const { primary, darkBrick, brick, lightBrick, secondary, tetriary } = Colors;

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import MainTabScreen from './MainTabScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfile from '../screens/EditProfile';
import HomeScreen from '../screens/HomeScreen';
import LocationScreen from '../screens/LocationScreen';
import Post from '../screens/Post';
import CameraView from '../screens/CameraView';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
        //initialRouteName="HomeScreen"
      >
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Signup" component={Signup} />

        <Stack.Screen name="MainTabScreen" component={MainTabScreen} options={{ headerShown: false }} />

        <Stack.Screen
          name="LocationScreen"
          component={LocationScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: { backgroundColor: 'transparent' },
            headerLeftContainerStyle: { paddingLeft: 20 },
            headerTintColor: '#000000',
            headerTransparent: true,
            headerBackVisible: true,
          }}
        />

        <Stack.Screen name="Post" component={Post} options={{headerShown: true, headerTitle: '', headerStyle: { backgroundColor: 'transparent'}, headerLeftContainerStyle: { paddingLeft: 20 }, headerTransparent: true, headerBackVisible: true}}/>

        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Edit Profile',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 17,
            },
            headerStyle: { backgroundColor: 'white' },
            headerLeftContainerStyle: { paddingLeft: 20 },
            headerTintColor: '#000000',
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerBackVisible: true,
          })}
        />
        <Stack.Screen name="HomeScreen" component={MainTabScreen} />

        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CameraView" component={CameraView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
