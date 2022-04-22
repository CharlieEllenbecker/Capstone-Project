import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import StarRating from './StarRating';
import getIp from '../ip';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
const ListView = ({ pin, navigation }) => {
    const [posts, setPosts] = useState([]);
    const [cardPicture, setCardPicture] = useState();
    const ip = getIp();
    const { jwt } = useSelector((state) => state.jwtReducer);
    const getPosts = async () => {
        await axios.get(`http://${ip}:3001/api/posts/all/${pin._id}`, { headers: { 'x-auth-token' : jwt }})
        .then((response) => {
            setPosts(response.data);
            if (response.data.length > 0){
                setCardPicture({ uri : `http://${ip}:3001/${response.data[0].postPictureFileName}` })
            }
            else {
                setCardPicture({ uri : '../assets/loginBackground1.jpg' });
            }
        })
        .catch((error) => {
            console.error(error);
        })
    }

    useEffect(() => {
        getPosts();
    },[])

    return (
        <View style={styles.card}>
            <Image source={cardPicture} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.textContent}>
            <Text numberOfLines={1} style={styles.cardtitle}>{pin.title}</Text>
            <StarRating rating={pin.rating} size={18} />
            {pin.description && <Text numberOfLines={1} style={styles.cardDescription}>{pin.description}</Text>}
            <View style={styles.button}>
                <TouchableOpacity
                onPress={() => {
                    navigation.navigate('LocationScreen', { pinId: pin._id });
                }}
                style={[
                    styles.signIn,
                    {
                    color: '#FF6347',
                    borderWidth: 0.5,
                    borderColor: 'black',
                    marginBottom: 5,
                    },
                ]}
                >
                <Text style={styles.textSign}>See Location</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    );
}  

export default ListView;