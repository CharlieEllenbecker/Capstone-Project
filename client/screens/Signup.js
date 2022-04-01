import React, { useState, ImageBackground } from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../components/keyboardAvoidingWrapper';
import config from '../ip.json';

//components
import {
  Colors,
  InnerContainer,
  PageTitle,
  SignupBackground,
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
} from '../components/styles';

//colors
const { brick } = Colors;

//axios
import axios from 'axios';

//Handling Signup
const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [jwt, setJwt] = useState();

  const handleSignup = async (values) => {
    {
      /* TODO: Just for the presentation */
    }
    // navigation.navigate('DrawerNavigator', { screen: 'HomeScreen' });

    const ip = config.ip;

    handleMessage(null);
    await axios
      .post(`http://${ip}:3001/api/users`, {
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        const result = response.headers['x-auth-token'];
        setJwt(result);

        navigation.navigate('DrawerNavigator', { screen: 'HomeScreen' });
      })
      .catch((error) => {
        handleMessage('Failed to signup.');
        console.log(error);
      });
  };
  //Handling messages
  const handleMessage = (message, type = 'Failed') => {
    setMessage(message);
    setMessageType(type);
  };
  //Load view
  return (
    <KeyboardAvoidingWrapper>
      <SignupBackground source={require('./../assets/signupBackground.jpg')}>
        <InnerContainer>
          <PageTitle>Phocate</PageTitle>
          <SubTitle>Create Account</SubTitle>

          <Formik
            initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
            onSubmit={(values) => {
              if (
                (values.email == '' && values.password == '') ||
                values.username == '' ||
                values.confirmPassword == ''
              ) {
                handleMessage('Please fill out all fields.');
              } else if (values.password !== values.confirmPassword) {
                handleMessage('Passwords do not match.');
              } else {
                handleSignup(values);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Username"
                  icon="person"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
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
                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                <ErrorMsg type={messageType}>{message}</ErrorMsg>

                <LoginButton onPress={handleSubmit}>
                  <ButtonText>Create new account</ButtonText>
                </LoginButton>

                <Line />

                <SignupButton onPress={() => navigation.navigate('Login')}>
                  <ButtonText>Already have an account?</ButtonText>
                </SignupButton>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </SignupBackground>
    </KeyboardAvoidingWrapper>
  );
};

//Hide or view password/confirmPassword
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brick} />
      </LeftIcon>
      <StyledTextLabel>{label}</StyledTextLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={25} color={brick} />
        </RightIcon>
      )}
    </View>
  );
};

//export signup screen

export default Signup;
