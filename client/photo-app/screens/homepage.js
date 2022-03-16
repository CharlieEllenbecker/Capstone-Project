import { StatusBar } from 'expo-status-bar';
import React, { useState, ImageBackground, Text} from 'react';
import { Formik } from 'formik';
import { View, ActivityIndicator } from 'react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';

import { StyledContainer, SubTitle } from './../components/styles';
const Homepage = () => {
    return (
        <StyledContainer>
                <SubTitle> Welcome to the homepage! </SubTitle>
        </StyledContainer>
    );
}

export default Homepage;