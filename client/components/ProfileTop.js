import React from 'react';
import { View } from 'react-native';
import ImagePickerCom from './ImagePicker';
import { deleteJWT } from '../state/actions/jwtActions';
import { deleteUserData } from '../state/actions/userActions';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
    HeaderContainer,
    SettingsButton,
    LogoutButton,
    UserContainer,
    ProfilePictureContainer,
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
const ProfileTop = ({ navigation }) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(deleteJWT());
        dispatch(deleteUserData());
        navigation.navigate('Login');
      };
      
    return(
    <View>
    <HeaderContainer>
        <SettingsButton> 
            <Ionicons name='ios-settings-outline' size={25}/> 
        </SettingsButton>
        <UsernameText>Username</UsernameText> 
        <LogoutButton onPress={() => handleLogout()}>
            <Ionicons name='ios-exit-outline' size={25}/>
        </LogoutButton> 
    </HeaderContainer>
      
    <UserContainer>
        <VerticalContainer>
            <ProfilePictureContainer onPress={ImagePickerCom}></ProfilePictureContainer> 
        </VerticalContainer>

        <VerticalContainer>
            <NumberOfPinsContainer>
                <VerticalContainer>
                    <HorizontalContainer>
                        <NumberOfPinsText>Pins</NumberOfPinsText>   
                        <NumberOfPinsText>Posts</NumberOfPinsText>  
                    </HorizontalContainer>
                    <HorizontalContainer>
                        <NumberOfPinsNumber>40</NumberOfPinsNumber> 
                        <NumberOfPinsNumber>40</NumberOfPinsNumber> 
                    </HorizontalContainer>
                </VerticalContainer>
            </NumberOfPinsContainer>

            <EditProfileButton>
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