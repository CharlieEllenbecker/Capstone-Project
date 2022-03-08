import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { DrawerActions } from '@react-navigation/native';

const HomeStack = createNativeStackNavigator();
const ExploreStack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff" style={{ flex: 1 }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        // was {HomeStackScreen} in tutorial
        options={{
          //tabBarLabel: "Home",
          tabBarLabel: <Text style={{ fontSize: 11 }}>Home</Text>,
          tabBarColor: '#ffffff',
          tabBarIcon: ({ color }) => <Ionicons name="ios-home" color="#000000" size={26} />,
        }}
      />

      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarLabel: <Text style={{ fontSize: 11 }}>Search</Text>,
          tabBarColor: '#ffffff',
          tabBarIcon: ({ color }) => <Ionicons name="search-outline" color="#000000" size={26} />,
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
          tabBarIcon: ({ color }) => <Ionicons name="notifications" color="#000000" size={26} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: <Text style={{ fontSize: 11 }}>Profile</Text>,
          tabBarColor: '#ffffff',
          tabBarIcon: ({ color }) => <Ionicons name="ios-person" color="#000000" size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
        headerShown: false,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Overview',
        headerLeft: () => (
          <Ionicons.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() => navigation.openDrawer()}
          ></Ionicons.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const ExploreStackScreen = ({ navigation }) => (
  <ExploreStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <ExploreStack.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        headerLeft: () => (
          <Ionicons.Button
            name="ios-menu"
            size={25}
            backgroundColor="#1f65ff"
            onPress={() => navigation.openDrawer()}
          ></Ionicons.Button>
        ),
      }}
    />
  </ExploreStack.Navigator>
);

const styles = StyleSheet.create({
  names: {
    marginBottom: 5,
  },
});
