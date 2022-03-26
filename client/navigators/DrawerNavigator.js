import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useTheme } from '@react-navigation/native';
import { DrawerContent } from '../screens/DrawerContent';
import { Colors } from './../components/styles';

//import HomeScreen from '../screens/homeScreen'; //import DetailsScreen from '../screens/DetailsScreen';
import MainTabScreen from './MainTabScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();
const { darkBrick } = Colors;

const DrawerNavigator = () => {
  const { colors } = useTheme();

  return (
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
    >
      <Drawer.Screen
        options={{ headerShown: false }}
        name="HomeDrawer"
        component={MainTabScreen}
        //options={{ headerShown: false }}
      />
      <Drawer.Screen name="HomeScreen" component={MainTabScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Bookmarks" component={BookmarkScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
    );
};

export default DrawerNavigator;