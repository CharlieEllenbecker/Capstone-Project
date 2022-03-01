import { StatusBar } from 'expo-status-bar';
import React, { useState, ImageBackground } from 'react';
import { Formik } from 'formik';
import { View, ActivityIndicator } from 'react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';

import { StyledContainer, LoginButton } from './../components/styles';
const Homepage = () => {
    return (
        <StyledContainer>
            <LoginButton>

                Welcome to the homepage!
            </LoginButton>
        </StyledContainer>
    );
}

export default Homepage;