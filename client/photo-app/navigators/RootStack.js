import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors } from './../components/styles';
const {primary, darkBrick, brick, lightBrick, secondary, tetriary} = Colors;


import Login from './../screens/login';
import Signup from './../screens/signup';
import Homepage from './../screens/homepage';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: darkBrick,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    } 
                }}
                initialRouteName="Login"
                >
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup}/>
                <Stack.Screen name="Homepage" component={Homepage}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;