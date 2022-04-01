import { View, Text, Button, StyleSheet, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import getIp from '../ip';
import { Octicons, Ionicons } from '@expo/vector-icons';
import {
  HeaderContainer,
  SettingsButton,
  LogoutButton,
  ProfileContainer,
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
} from '../components/styles';
import axios from 'axios';
// import gridView from "../components/Gridview";


const images = [
  require('../assets/banners/food-banner1.jpg'),
  require('../assets/banners/food-banner4.jpg'),
  require('../assets/banners/food-banner3.jpg'),
  require('../assets/banners/food-banner2.jpg'),
  require('../assets/banners/food-banner5.jpg')
]


export const gridView = (images, width, height) => {
  return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {renderImages(images, width, height)}
      </View>
  );
}

const renderImages = (images, width, height) => {
  return images.map((image) => {
      return <View style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
          <Image style={{ flex: 1, width: undefined, height: undefined, borderColor: '#FFFFFF', borderWidth: 1 }} source={image}/>
      </View>
  });
}

const ProfileScreen = ({ route, navigation }) => {
    const [user, setUser] = useState('');
    var {width, height} = Dimensions.get('screen');
    const ip = getIp();

    const getUser = async () => {
      const data = await axios.get(`http://${ip}:3001/api/users/me/`, { headers: { 'x-auth-token': jwt } })
      .catch(error => {
        console.log(error);
      });

    };
    getUser();
  // TODO: handle the logout by not sending jwt token?
  const handleLogout = async () => {
    await axios(`http://${ip}:3001/`);
  };

  return (
    
    <ProfileContainer>
      <HeaderContainer>
        <SettingsButton><Ionicons name='ios-settings-outline' size={25}/></SettingsButton>
        <UsernameText>Username</UsernameText>
        <LogoutButton onPress={() => navigation.navigate('Login')}><Ionicons name='ios-exit-outline' size={25}/></LogoutButton>
      </HeaderContainer>
      
      <UserContainer>
        <VerticalContainer>
        <ProfilePictureContainer></ProfilePictureContainer>
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
      {/* When images are working gridview will appear */}
      {gridView(images, width, height)}
    </ProfileContainer>
  );
};

export default ProfileScreen;
