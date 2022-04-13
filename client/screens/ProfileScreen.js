import {
  View, 
  Image, 
  Dimensions,
  ScrollView } from 'react-native';
import React, { 
  useState, 
  useEffect } from 'react';
import ProfileTop from '../components/ProfileTop';
import GridView from '../components/GridView';
import getIp from '../ip';
import { useSelector, useDispatch } from 'react-redux';
import { deleteJWT } from '../state/actions/jwtActions';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
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


const ProfileScreen = ({ route, navigation }) => {
    // const [user, setUser] = useState('');
    // var {width, height} = Dimensions.get('screen');
    // const ip = getIp();
    // const { jwt } = useSelector((state) => state.jwtReducer);
    // const dispatch = useDispatch();
    const images = [
      require('../assets/banners/food-banner1.jpg'),
      require('../assets/banners/food-banner4.jpg'),
      require('../assets/banners/food-banner3.jpg'),
      require('../assets/banners/food-banner2.jpg'),
      require('../assets/banners/food-banner5.jpg')
    ]
        // const getUser = async () => {
        //   const ip = config.ip;
        //   const data = await axios.get(`http://${ip}:3001/api/users/me/`, { headers: { 'x-auth-token': jwt } })
        //   .catch(error => {
        //     console.log(error);
        //   });
        // };
        // getUser();
        
  return (
    <ProfileContainer>
      <ProfileTop navigation={navigation}/>
      <ScrollView scrollEventThrottle={16}>
        <GridView images={images}/>
      </ScrollView>
    </ProfileContainer>
  );
};

export default ProfileScreen;