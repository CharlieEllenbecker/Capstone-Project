import React, { useState } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CameraView from '../screens/CameraView'

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = ({ route, navigation }) => {
  return (
    <Tab.Navigator         
      initialRouteName="Home"
      activeColor="#000000"
      inactiveColor="#000000"
      barStyle={{ backgroundColor: '#ffffff' }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        // was {HomeStackScreen} in tutorial
        options={{
          //tabBarLabel: "Home",
          tabBarLabel: <Text style={{ fontSize: 11, color: '#000000' }}>Home</Text>,
          
          tabBarIcon: ({ color }) => <Ionicons name="ios-home" color="#000000" size={26} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={CameraView}
        options={{
          tabBarLabel: 'Explore',
          tabBarLabel: <Text style={{ fontSize: 11, color: '#000000' }}>Camera</Text>,
          
          tabBarIcon: ({ color }) => <Ionicons name="ios-camera" color="#000000" size={26} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: <Text style={{ fontSize: 11, color: '#000000' }}>Profile</Text>,
          
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
