import { StatusBar } from 'expo-status-bar';
import React, { useState, ImageBackground } from 'react';
import { Formik } from 'formik';
import { View, KeyboardAvoidingView } from 'react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from './../components/keyboardAvoidingWrapper';
import {
  Colors,
  StyledContainer,
  InnerContainer,
  PageLogo,
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
} from './../components/styles';

const { darkBrick, brick, primary, lightBrick } = Colors;

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleSignup = (credentials) => {
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
          navigation.navigate('HomeScreen', { ...data });
        }
      })
      .catch((error) => {
        handleMessage('Failed to signup.');
      });
  };

  const handleMessage = (message, type = 'Failed') => {
    setMessage(message);
    setMessageType(type);
  };
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

export default Signup;
