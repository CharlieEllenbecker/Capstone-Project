import getIp from '../ip';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { deleteJWT } from '../state/actions/jwtActions';
import { Octicons, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
    View, 
    Image,
    ImageBackground,
    Dimensions,
    ScrollView } from 'react-native';
import {
    EditLeftIcon,
    EditRightIcon,
    DeleteButton,
    ButtonText,
    ProfilePictureContainer,
    UsernameText,
    Line,
    VerticalContainer,
    LocationLine,
    EditTextInput,
    EditTextLabel,
    ErrorMsg,
  } from '../components/styles';
import axios from 'axios';




const EditProfile = ({ route, navigation }) => {
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const ip = getIp();
    const dispatch = useDispatch();
    const { jwt } = useSelector((state) => state.jwtReducer);

    const getUserData = async () => {
        await axios.get(`http://${ip}:3001/api/users/me`, { headers: { 'x-auth-token': jwt } })
        .then((response) => {
            setUsername(response.data.username);
            setEmail(response.data.email);
            const url = `http://${ip}:3001/${response.data.profilePictureFileName}`
            setProfilePicture(url);
            console.log(profilePicture, username);
            console.log(response.data)
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const setUserData = async (values) => {
        if (values.username === username && values.password !== '') {
            await axios.put(`http://${ip}:3001/api/users/`,  { email: values.email, password: values.password }, { headers: { 'x-auth-token' : jwt }  })
        .then ((response) => {
            setEmail(values.email);
            navigation.navigate('MainTabScreen', { screen: 'Profile' });
            console.log(response.data);
        })
        .catch ((error) => {
            console.log(error.response.data);
        });
        }
        else if (values.username !== username && values.password === '') {
            await axios.put(`http://${ip}:3001/api/users/`,  { username: values.username, email: values.email }, { headers: { 'x-auth-token' : jwt }  })
        .then ((response) => {
            setEmail(values.email);
            setUsername(values.username);
            navigation.navigate('MainTabScreen', { screen: 'Profile' });
            console.log(response.data);
        })
        .catch ((error) => {
            console.log(error.response.data);
        });
        }
        else {
            await axios.put(`http://${ip}:3001/api/users/`,  { username: values.username, email: values.email, password: values.password }, { headers: { 'x-auth-token' : jwt }  })
            .then ((response) => {
                setEmail(values.email);
                setUsername(values.username);
                navigation.navigate('MainTabScreen', { screen: 'Profile' });
                console.log(response.data);
            })
            .catch ((error) => {
                console.log(error.response.data);
            });
        }
    }

    //Handling messages
    const handleMessage = (message, type = 'Failed') => {
        setMessage(message);
        setMessageType(type);
    };


    useEffect(() => {
        getUserData();
    }, [username, profilePicture]);

return(
    <Formik
            enableReinitialize
            initialValues={{ username: username, email: email, password: password, confirmPassword: password }}
            onSubmit={(values) => {
                if (values.password !== values.confirmPassword) {
                    handleMessage("Passwords do not match.", 'Failed');
                }
                else {
                    setUserData(values);
                }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
    <View style={{flex: 2, width: '100%', justifyContent: 'center'}}>
        <ScrollView scrollEventThrottle={16}>
            <VerticalContainer style={{alignItems: 'center'}}>
                <ProfilePictureContainer style={{marginTop: 100, alignItems: 'center', justifyContent: 'center'}}><ImageBackground imageStyle={{borderRadius: 80}} style={{height: 160, width: 160, alignItems: 'center'}} source={{ uri: profilePicture }}><Ionicons name="ios-add-circle" size={40} color='rgba(0,0,0,0.7)' style={{top: 110, left: 60}}/></ImageBackground></ProfilePictureContainer>
                <UsernameText>{username}</UsernameText>
            </VerticalContainer>
            <LocationLine/>
            <VerticalContainer style={{paddingLeft: 50, paddingRight: 50}}>
                <MyTextInput 
                    placeholder={username}
                    label="Username"
                    icon="person"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')} 
                    value={values.username}
                />
                <MyTextInput 
                    placeholder={email}
                    label='Email'
                    icon="mail"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                />
                <MyTextInput
                    placeholder={'Tell us about yourself'}
                    icon="repo"
                    label='Bio'
                />
                <MyTextInput 
                    placeholder={'**********'}  
                    label='New Password'
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
                    placeholder={'**********'}
                    label='Confirm New Password'
                    icon="lock"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                />
                <ErrorMsg>{message}</ErrorMsg>
                <Line style={{backgroundColor: '#000000'}}/>

                <DeleteButton onPress={handleSubmit} style={{backgroundColor: '#2fbf78'}}><ButtonText style={{color: '#FFFFFF'}}>Save Changes</ButtonText></DeleteButton>
                <DeleteButton><ButtonText>Delete Account</ButtonText></DeleteButton>
            </VerticalContainer>
        </ScrollView>
    </View>
            )}
    </Formik>
);
}


const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
      <View>
        <EditLeftIcon>
          <Octicons name={icon} size={30} color={'#000000'} />
        </EditLeftIcon>
        <EditTextLabel>{label}</EditTextLabel>
        <EditTextInput {...props} />
        {isPassword && (
          <EditRightIcon onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={25} color={'#000000'} />
          </EditRightIcon>
        )}
      </View>
    );
  };


export default EditProfile;