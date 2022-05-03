import { ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import ProfileTop from '../components/ProfileTop';
import GridView from '../components/GridView';
import getIp from '../ip';
import { useSelector } from 'react-redux';
import { ProfileContainer } from '../components/styles';
import axios from 'axios';

const ProfileScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const ip = getIp();
  const { jwt } = useSelector((state) => state.jwtReducer);

  const getPosts = async () => {
    await axios.get(`http://${ip}:3001/api/posts/my`, { headers: { 'x-auth-token' : jwt }})
    .then((response) => {
      setPosts(response.data);
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
      <ProfileTop navigation={navigation} length={posts.length}/>
      <ScrollView scrollEventThrottle={16}>
        <GridView navigation={navigation} posts={posts} />
      </ScrollView>
    </ProfileContainer>
  );
};

export default ProfileScreen;
