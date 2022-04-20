import React, { useState } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';

import LocationScreen from '../screens/LocationScreen';
import CameraView from '../screens/CameraView'

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = ({ route, navigation }) => {
  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions= {{activeBackgroundColor: '#FFFFFF', inactiveBackgroundColor: '#FFFFFF', style: {backgroundColor: '#FFFFFF'}}} activeColor="#fff" style={{ flex: 1 }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        // was {HomeStackScreen} in tutorial
        options={{
          //tabBarLabel: "Home",
          tabBarLabel: <Text style={{ fontSize: 11 }}>Home</Text>,
          tabBarColor: '#FFFFFF',
          tabBarIcon: ({ color }) => <Ionicons name="ios-home" color="#000000" size={26} />,
        }}
      />

      <Tab.Screen
        name="Explore"
        component={CameraView}
        options={{
          tabBarLabel: 'Explore',
          tabBarLabel: <Text style={{ fontSize: 11 }}>Camera</Text>,
          tabBarColor: '#FFFFFF',
          tabBarIcon: ({ color }) => <Ionicons name="ios-camera" color="#000000" size={26} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        // was {NotificationsStackScreen}} in tutorial
        options={{
          //tabBarLabel: "Updates",
          tabBarLabel: (
            <Text style={{ fontSize: 11 }} color="#000000">
              Updates
            </Text>
          ),
          tabBarColor: '#ffffff',
          tabBarIcon: ({ color }) => <Ionicons name="ios-bookmark" color="#000000" size={26} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: <Text style={{ fontSize: 11 }}>Profile</Text>,
          tabBarColor: '#FFFFFF',
          tabBarIcon: ({ color }) => <Ionicons name="ios-person" color="#000000" size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;


const styles = StyleSheet.create({
  names: {
    marginBottom: 5,
  },
});
