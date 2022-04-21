import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import ImagePickerCom from './ImagePicker';
import { deleteJWT, getJWT } from '../state/actions/jwtActions';
import { deleteUserData } from '../state/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
    HeaderContainer,
    SettingsButton,
    LogoutButton,
    UserContainer,
    ProfilePicContainer,
    NumberOfPinsContainer,
    NumberOfPinsText,
    EditProfileButton,
    EditButtonText,
    UsernameText,
    BioText,
    NumberOfPinsNumber,
    VerticalContainer,
    HorizontalContainer,
    LocationLine,
  } from './styles';
import axios from 'axios';
import getIp from '../ip.js';
import { propTypes } from 'react-bootstrap/esm/Image';
const ProfileTop = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const ip = getIp();
    const dispatch = useDispatch();
    const { jwt } = useSelector((state) => state.jwtReducer);
    const handleLogout = () => {
        dispatch(deleteJWT());
        dispatch(deleteUserData());
        navigation.navigate('Login');
      };

    const getUserData = async () => {
        await axios.get(`http://${ip}:3001/api/users/me`, { headers: { 'x-auth-token': jwt } })
        .then((response) => {
            setUsername(response.data.username);
            const url = `http://${ip}:3001/${response.data.profilePictureFileName}`
            setProfilePicture(url);
            console.log(profilePicture, username);
        })
        .catch((error) => {
            console.error(error);
        });
    }
    useEffect(() => {
        getUserData();
    });
    
    return(
    <View>
    <HeaderContainer>
        <SettingsButton> 
            <Ionicons name='ios-settings-outline' size={25}/> 
        </SettingsButton>
        <UsernameText>{username}</UsernameText> 
        <LogoutButton onPress={() => handleLogout()}>
            <Ionicons name='ios-exit-outline' size={25}/>
        </LogoutButton> 
    </HeaderContainer>
      
    <UserContainer>
        <VerticalContainer>
            <Image style={{height: 160, width: 160, borderRadius: 80}} source={{ uri: profilePicture }}/> 
        </VerticalContainer>

        <VerticalContainer>
            <NumberOfPinsContainer>
                <VerticalContainer>
                    <HorizontalContainer>
                        <NumberOfPinsText>Pins</NumberOfPinsText>   
                        <NumberOfPinsText>Posts</NumberOfPinsText>  
                    </HorizontalContainer>
                    <HorizontalContainer>
                        <NumberOfPinsNumber>5</NumberOfPinsNumber> 
                        <NumberOfPinsNumber>5</NumberOfPinsNumber> 
                    </HorizontalContainer>
                </VerticalContainer>
            </NumberOfPinsContainer>

            <EditProfileButton onPress={() => navigation.navigate('EditProfile')}>
                <EditButtonText>Edit profile</EditButtonText> 
            </EditProfileButton>
        </VerticalContainer>
    </UserContainer>

    <BioText>This is my bio.</BioText>  

    <LocationLine/>
    </View>
    ); 
};
export default ProfileTop;