import React, { useState } from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../components/keyboardAvoidingWrapper';
import { useDispatch } from 'react-redux';
import { setJWT } from '../state/actions/jwtActions';
import getIp from '../ip';
//components
import {
  Colors,
  InnerContainer,
  PageLogo,
  PageTitle,
  LoginBackground,
  StyledFormArea,
  LeftIcon,
  RightIcon,
  LoginButton,
  SignupButton,
  StyledTextLabel,
  StyledTextInput,
  ButtonText,
  ErrorMsg,
  Line
} from '../components/styles';
//axios
import axios from 'axios';
//colors
const { brick } = Colors;
const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const ip = getIp();
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    handleMessage(null);
    await axios.post(`http://${ip}:3001/api/users/login/`, {
      email: values.email,
      password: values.password
    })
    .then((response) => {
      const result = response.headers['x-auth-token'];
      dispatch(setJWT(result));
      navigation.navigate('HomeScreen');
    })
    .catch(error => {
      handleMessage("Failed to login.");
      console.error(error);
    });
  }
//handling messages
    const handleMessage = (message, type = 'Failed') => {
      setMessage(message);
      setMessageType(type);
    };

//Load view
  return (
    <KeyboardAvoidingWrapper>
      <LoginBackground source={require('./../assets/loginBackground1.jpg')}>
        <InnerContainer>
          <PageLogo resizeMode="contain" source={require('./../assets/logo1.png')}></PageLogo>
          <PageTitle type="login">Phocate</PageTitle>

          <Formik
            initialValues={{ password: '', email: '' }}
            onSubmit={(values, actions) => {
              if (values.password == '' || values.email == '') {
                handleMessage('Please fill out all fields.');
              } else {
                handleLogin(values);
                actions.resetForm();
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, handleReset, values }) => {
              return (
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
                  <LoginButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </LoginButton>
                  <Line />
                  <SignupButton onPress={() => {
                    navigation.navigate('Signup');
                    handleReset();
                  }}>
                    <ButtonText>Create new account</ButtonText>
                  </SignupButton>
                </StyledFormArea>
              );
            }}
          </Formik>
        </InnerContainer>
      </LoginBackground>
    </KeyboardAvoidingWrapper>
  );
};

//Hide or view password
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
//export login screen

export default Login;
