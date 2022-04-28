import { ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import ProfileTop from '../components/ProfileTop';
import GridView from '../components/GridView';
import getIp from '../ip';
import { useSelector } from 'react-redux';
import { ProfileContainer } from '../components/styles';
import axios from 'axios';

//static
// const images = [
//   require('../assets/banners/food-banner1.jpg'),
//   require('../assets/banners/food-banner4.jpg'),
//   require('../assets/banners/food-banner3.jpg'),
//   require('../assets/banners/food-banner2.jpg'),
//   require('../assets/banners/food-banner5.jpg'),
// ];


const ProfileScreen = ({ route, navigation }) => {
  const [images, setImages] = useState([]);
  const ip = getIp();
  const { jwt } = useSelector((state) => state.jwtReducer);
  const getPosts = async () => {
    await axios.get(`http://${ip}:3001/api/posts/my`, { headers: { 'x-auth-token' : jwt }})
    .then((response) => {
      setImages(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <ProfileContainer>
      <ProfileTop navigation={navigation} length={images.length}/>
      <ScrollView scrollEventThrottle={16}>
        <GridView navigation={navigation} images={images} />
      </ScrollView>
    </ProfileContainer>
  );
};

export default ProfileScreen;
