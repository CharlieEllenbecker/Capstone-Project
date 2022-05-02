//import react/formik/icons/keyboardAvoidingView
import React, { useEffect, useState, createRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Platform
} from 'react-native';
import CameraView from './CameraView';
import BottomSheet from 'reanimated-bottom-sheet';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Animated from 'react-native-reanimated';
import StarRating from '../components/StarRating';
import getIp from '../ip';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPin, setSelectedPinReviews, setSelectedPinPosts } from '../state/actions/pinActions';
//components
import GridView from '../components/GridView';
import ReviewTop from '../components/ReviewTop';
import UserDisplay from '../components/DisplayUser';
import {
  styles,
  StyledReviewContainer,
  HorizontalContainer,
} from './../components/styles';
//axios
import axios from 'axios';


const LocationScreen = ({ route, navigation }) => {
  const { pinId } = route.params;
  const ip = getIp();
  const dispatch = useDispatch();
  const { jwt } = useSelector((state) => state.jwtReducer);
  const { selectedPinReviews } = useSelector((state) => state.pinReducer);
  const bs = createRef();
  const fall = new Animated.Value(1);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [takenImage, setTakenImage] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [postDescription, setPostDescription] = useState('');

  const getPinData = async () => {
    await axios.get(`http://${ip}:3001/api/pins/${pinId}`, { headers: { 'x-auth-token': jwt } })
    .then((response) => {
      dispatch(setSelectedPin(response.data));
    })
    .catch(error => {
      console.log(error);
    });
  };
  
  const getPosts = async () => {
    await axios.get(`http://${ip}:3001/api/posts/all/${pinId}`, { headers: { 'x-auth-token' : jwt }})
    .then((response) => {
      setImages(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  const getReviews = async () => {
    await axios.get(`http://${ip}:3001/api/reviews/all/${pinId}`, { headers: { 'x-auth-token': jwt } })
      .then((response) => {
        dispatch(setSelectedPinReviews(response.data));
      })
      .catch((error) => {
        console.error(error);
      })
  }
  
  const postPost = async (uri, fileName, ext) => {
    const formData = new FormData();
    console.log('Uri:', uri);
    console.log('FileName:', fileName);
    console.log('Ext:', ext);
    formData.append('image', {
      uri: uri,
      name: fileName,
      type: `image/${ext}`
    });

    console.log(formData);
    await axios.post(`http://${ip}:3001/api/pictures`, formData, { headers: { 'x-auth-token' : jwt, 'Content-Type': 'multipart/form-data' }}, )
    .then((response) => {
      console.log(response.data.pictureFileName);
      postDesc(response.data.pictureFileName);
    })
    .catch((error) => {
      console.log(error);
    })
    
  }

  const postDesc = async (pictureFileName) => {
    await axios.post(`http://${ip}:3001/api/posts/${pinId}`, { description: postDescription, postPictureFileName: pictureFileName }, { headers: { 'x-auth-token' : jwt }})
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
  } 
  useEffect(() => {
    getPinData();
    getReviews();
    getPosts();
  }, []);


  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      const uri = result.uri;
      const fileName = result.uri.replace(/^.*[\\\/]/, "");
      const ext = result.uri.substring(result.uri.lastIndexOf(".") + 1);
      postPost(uri, fileName, ext);
    }
  };

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setTakenImage(result.uri);
  };

  const renderContent = () => ( // TODO: make a component for creating a new pin?
  <View style={[styles.panel, { border: '3px solid rgba(0, 0, 0, 0.1)' }]}>
    <TextInput
      placeholder="Description"
      placeholderTextColor="#808080"
      autoCapitalize="none"
      style={styles.pinDetails}
      onChangeText={(newText) => {
        setPostDescription(newText);
      }}
    />

    <TouchableOpacity
      style={styles.panelReviewButton}
      onPress={() => {
        navigation.navigate('CameraView', { setTakenImage: setTakenImage });
      }}
    >
      {/* <Text style={styles.panelButtonTitle} onPress={__startCamera}> */}
      <Text style={styles.panelButtonTitle}>Take Photo</Text>
      {/* {capturedImage && <Image source={{ uri: image }} style={{ flex: 1 }} />} */}
    </TouchableOpacity>
    <TouchableOpacity style={styles.panelReviewButton} onPress={async () => {pickImage()}}>
      <Text style={styles.panelButtonTitle}>Choose From Library</Text>
    </TouchableOpacity>
    
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity style={[styles.panelReviewButton, { width: '49%', backgroundColor: '#ce3a39', borderWidth: 0, marginBottom: 13, marginRight: '2%'  }]} onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.panelReviewButton, { width: '49%', backgroundColor: '#2fbf78', borderWidth: 0, marginBottom: 13 }]}
        onPress={() => {
          bs.current.snapTo(1);
        }}
      >
        <Text style={styles.panelButtonTitle}>Accept</Text>
      </TouchableOpacity>
    </View>
  </View>
);

  return (
    <StyledReviewContainer>
      <ReviewTop getPinData={getPinData} pinId={pinId} bs={bs}/>
      <ScrollView
        scrollEventThrottle={16}
      >
        <View style={{ height: 160, marginTop:5, marginBottom: 5}}>
          <ScrollView
            horizontal={true}
          >
            {selectedPinReviews .map((review, index) => {
              return (
                <View key={index} style={{ width: 200, marginLeft: 20, borderWidth: 0.7, borderRadius: 5, borderColor: '#dddddd' }}>
                  <View style={{flex: 1, paddingLeft: 15, paddingTop: 15 }}>
                    <HorizontalContainer>
                    </HorizontalContainer>
                    <UserDisplay userId={review.userId} />
                    <StarRating size={15} rating={review.rating} style={{ paddingLeft: 5 }}/>
                    {review.description && <Text style={{ paddingLeft: 5 }}>{review.description}</Text>}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <GridView navigation={navigation} images={images}/>
      </ScrollView>
      <BottomSheet
          ref={bs}
          snapPoints={['30%', '-10%']}
          renderContent={renderContent}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
    </StyledReviewContainer>
  );
};


export default LocationScreen;