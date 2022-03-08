import * as React from 'react';
import react from 'react';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import { NavigationContainer, theme, useTheme } from '@react-navigation/native';
import { DrawerContent } from '../screens/DrawerContent';
import { Colors } from './../components/styles';

//import HomeScreen from '../screens/homeScreen'; //import DetailsScreen from '../screens/DetailsScreen';
import Login from './../screens/login';
import Signup from './../screens/signup';
import MainTabScreen from './MainTabScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();
const { primary, darkBrick, brick, lightBrick, secondary, tetriary } = Colors;

const DrawerNavigator = () => {
  const { colors } = useTheme();

  return (
    // <PaperProvider theme={theme}>

    // <NavigationContainer theme={theme}>
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
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
      // initialRouteName="Login"
    >
      <Drawer.Screen
        options={{ headerShown: false }}
        name="HomeDrawer"
        component={MainTabScreen}
        //options={{ headerShown: false }}
      />
      {/* <Drawer.Screen name="Support" component={SupportScreen} /> */}
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Signup" component={Signup} />
      <Drawer.Screen name="HomeScreen" component={MainTabScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Bookmarks" component={BookmarkScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
