import {
  View, 
  Image, 
  Dimensions,
  ScrollView } from 'react-native';
import React, { 
  useState, 
  useEffect } from 'react';
import getIp from '../ip';
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
    const [user, setUser] = useState('');
    var {width, height} = Dimensions.get('screen');
    const ip = getIp();

  return (
    
    <ProfileContainer>
      <HeaderContainer>
        <SettingsButton> 
          <Ionicons name='ios-settings-outline' size={25}/> 
        </SettingsButton>
        <UsernameText>Username</UsernameText> 
        <LogoutButton onPress={() => navigation.navigate('Login')}>
          <Ionicons name='ios-exit-outline' size={25}/>
        </LogoutButton> 
      </HeaderContainer>
      
      <UserContainer>
        <VerticalContainer>
          <ProfilePictureContainer onPress={openImagePickerAsync}></ProfilePictureContainer> 
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

      <ScrollView scrollEventThrottle={16}>
      {gridView(images, width, height)}
      </ScrollView>
    </ProfileContainer>
  );
};

export default ProfileScreen;


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
    // const getUser = async () => {

    //   const data = await axios.get(`http://${ip}:3001/api/users/me/`, { headers: { 'x-auth-token': jwt } })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // };
    // getUser();
  
    const handleLogout = async () => {
      await axios(`http://${ip}:3001/`);
    };

    let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }
  
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result.uri);
  
      if (result.cancelled === true) {
        return;
      }
      setSelectedImage(result.uri);
      //require('../assets/banners/food-banner1.jpg')
    };
