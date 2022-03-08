import { StatusBar } from 'expo-status-bar';
import React, { useState, ImageBackground } from 'react';
import { Formik } from 'formik';
import { View, ActivityIndicator } from 'react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';

//components
import KeyboardAvoidingWrapper from './../components/keyboardAvoidingWrapper';
import {
  Colors,
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  LoginBackground,
  StyledFormArea,
  SubTitle,
  LeftIcon,
  RightIcon,
  LoginButton,
  SignupButton,
  StyledTextLabel,
  StyledTextInput,
  ButtonText,
  ErrorMsg,
  Line,
} from './../components/styles';

//axios
import axios from 'axios';

//colors
const { darkBrick, brick, primary, lightBrick } = Colors;

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleLogin = (credentials) => {
    handleMessage(null);
    const url = '/api/users';

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        if (status !== 'Success') {
          handleMessage(message, status);
        } else {
          navigation.navigate('HomeScreen', { ...data[0] });
        }
      })
      .catch((error) => {
        handleMessage('Failed to login');
      });
  };

  const handleMessage = (message, type = 'Failed') => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <KeyboardAvoidingWrapper>
      <LoginBackground source={require('./../assets/loginBackground.jpg')}>
        <InnerContainer>
          <PageLogo resizeMode="contain" source={require('./../assets/logo1.png')}></PageLogo>
          <PageTitle type="login">Phocate</PageTitle>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => {
              if (values.email == '' && values.password == '') {
                handleMessage('Please enter a username and password');
              } else {
                handleLogin(values);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label="Password"
                  icon="lock"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                <ErrorMsg type={messageType}>{message}</ErrorMsg>

                <LoginButton onPress={handleLogin}>
                  <ButtonText>Login</ButtonText>
                </LoginButton>

                <Line />

                <SignupButton onPress={() => navigation.navigate('Signup')}>
                  <ButtonText>Create new account</ButtonText>
                </SignupButton>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </LoginBackground>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brick} />
      </LeftIcon>
      <StyledTextLabel>{label}</StyledTextLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={25} color={brick} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
