import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getIp from '../ip.js';
import {
    ReviewUserName,
    ReviewProfilePic,
    HorizontalContainerTwo,
} from './styles';
const UserDisplay = ({ userId }) => {
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const ip = getIp();
    const { jwt } = useSelector((state) => state.jwtReducer);

    const getUser = async () => {
        await axios.get(`http://${ip}:3001/api/users/${userId}`, { headers: {'x-auth-token': jwt}})
        .then((response) => {
            setUsername(response.data.username);
            setProfilePic(`http://${ip}:3001/${response.data.profilePictureFileName}`);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    useEffect(() => {
        getUser();
    },[])

    return (    
        <HorizontalContainerTwo>
            <ReviewProfilePic source={{uri : profilePic}}/>
            <ReviewUserName>{username}</ReviewUserName>
        </HorizontalContainerTwo>
    );
}

export default UserDisplay;