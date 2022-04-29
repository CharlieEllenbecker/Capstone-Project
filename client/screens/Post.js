import React, { useEffect, useState } from 'react';
import getIp from '../ip';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Text, View, ImageBackground, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    OverlayProfilePic,
    OverlayUsername,
    OverlayDescription,
    } from '../components/styles';

const Post = ({route, navigation}) => {
    const ip = getIp();
    const { postId } = route.params
    const [userId, setUserId] = useState('');
    const { jwt } = useSelector((state) => state.jwtReducer);
    const [image, setImage] = useState('');
    const [username, setUsername] = useState('')
    const [profilePicture, setProfilePicture] = useState('../assets/profilePics/profilepic1.png');
    const [desc, setDesc] = useState('');
    const [pinId, setPinId] = useState('');
    const [pin, setPin] = useState('../assets/loginBackground1.jpg');
    const [loading, setLoading] = useState(false);
    
    const getPostInfo= async () => {
        await axios.get(`http://${ip}:3001/api/posts/${postId}`, { headers: { 'x-auth-token': jwt } })
        .then((response) => {
            console.log(response);
            setUserId(response.data.userId);
            setImage(`http://${ip}:3001/${response.data.postPictureFileName}`);
            setDesc(response.data.description);
            setPinId(response.data.pinId);
            getPostUser(response.data.userId)
            getPinData(response.data.pinId);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const getPostUser = async (id) => {
        await axios.get(`http://${ip}:3001/api/users/${id}`, { headers: { 'x-auth-token': jwt } })
        .then((response) => {
            setUsername(response.data.username);
            setProfilePicture(`http://${ip}:3001/${response.data.profilePictureFileName}`);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const getPinData = async (id) => {
        await axios.get(`http://${ip}:3001/api/pins/${id}`, { headers: { 'x-auth-token' : jwt } })
        .then((response) => {
            setPin(response.data.title);
            setLoading(true);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    useEffect(() => {
        getPostInfo();
    })
    return (
        <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
            {loading ? (<ImageBackground source={{ uri: image }} resizeMode='contain' style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{top: 40, justifyContent: 'center', alignItems: 'center', padding: 11, borderRadius: 30, backgroundColor: 'rgba(0,0,0,0.5)', alignSelf: 'center'}}>
                        <Text style={{fontWeight: 'bold', color: '#FFFFFF'}}>{pin}</Text>
                    </View>
                    <LinearGradient colors={['rgba(0, 0, 0, 0.02)', 'rgba(0, 0, 0, 1)']} style={{width: '100%', height: '23%' }}>
                        <OverlayProfilePic source = {{ uri : profilePicture }}/>
                        <OverlayUsername>{username}</OverlayUsername>
                        <OverlayDescription>{desc}</OverlayDescription>
                    </LinearGradient>
                </View>
            </ImageBackground>)
            : (<View style={{justifyContent: "center", alignItems: "center"}}><ActivityIndicator size="large" color="#000000"></ActivityIndicator></View>)}
        </View>
    );
}

export default Post;