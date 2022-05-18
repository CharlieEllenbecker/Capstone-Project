//import react/formik/icons/keyboardAvoidingView
import React, { useEffect, useState, createRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Platform } from 'react-native';
import CameraView from './CameraView';
import BottomSheet from 'reanimated-bottom-sheet';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Animated, { set } from 'react-native-reanimated';
import StarRating from '../components/StarRating';
import getIp from '../ip';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPin, setSelectedPinReviews, setSelectedPinPosts } from '../state/actions/pinActions';
//components
import GridView from '../components/GridView';
import ReviewTop from '../components/ReviewTop';
import UserDisplay from '../components/DisplayUser';
import { styles, StyledReviewContainer, HorizontalContainer } from './../components/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

//axios
import axios from 'axios';

const LocationScreen = ({ route, navigation }) => {
  const { pinId, capturedImage } = route.params;
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
  const [posts, setPosts] = useState([]);
  const [takenImage, setTakenImage] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [postDescription, setPostDescription] = useState('');

  const [base64, setBase64] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileNameCamera, setFileNameCamera] = useState(null);
  const [fileNameLibrary, setFileNameLibrary] = useState(null);

  const getPinData = async () => {
    await axios
      .get(`http://${ip}:3001/api/pins/${pinId}`, { headers: { 'x-auth-token': jwt } })
      .then((response) => {
        dispatch(setSelectedPin(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPosts = async () => {
    await axios
      .get(`http://${ip}:3001/api/posts/all/${pinId}`, { headers: { 'x-auth-token': jwt } })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getReviews = async () => {
    await axios
      .get(`http://${ip}:3001/api/reviews/all/${pinId}`, { headers: { 'x-auth-token': jwt } })
      .then((response) => {
        dispatch(setSelectedPinReviews(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const postPost = async () => {
    if(fileNameCamera) {
      setFileName(fileNameCamera);
    } else {
      setFileName(fileNameLibrary);
    }
    
    await axios
      .post(
        `http://${ip}:3001/api/pictures`,
        { base64: base64, fileName: fileName, isTest: false },
        { headers: { 'x-auth-token': jwt } },
      )
      .then((response) => {
        postDesc(response.data.pictureFileName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postDesc = async (postPictureFileName) => {
    const body = { postPictureFileName: postPictureFileName };
    if (description !== '') {
      body.description = description;
    }

    await axios
      .post(`http://${ip}:3001/api/posts/${pinId}`, body, { headers: { 'x-auth-token': jwt } })
      .then((response) => {
        getPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (route.params?.capturedImage) {
      setTakenImage(route.params.capturedImage);
      setBase64(route.params.base64);

      // console.log('taken image in LocationScreen', takenImage);
      // console.log('base64 in LocationScreen', base64);
      // console.log('TakenImage no .uri at the end, in Locationscreen.js: ' + takenImage);
      const fileName = JSON.stringify(takenImage).replace(/^.*[\\\/]/, '');
      //console.log('fileName in after Stringify and replace', fileName);
      setFileNameCamera(fileName);
    } else {
      getPinData();
      getReviews();
      getPosts();
    }
  }, [posts, route.params?.capturedImage, route.params?.base64]);

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      return alert('Permission to access camera roll is required!');
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setBase64(result.base64);
      setFileNameLibrary(result.uri.replace(/^.*[\\\/]/, ''));
    }
  };

  const openCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    console.log('here', permissionResult.granted);

    if (!permissionResult.granted) {
      return alert('Permission to access camera is required!');
    } else {
      navigation.navigate('CameraView');
    }
  };

  const renderContent = () => (
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
        style={
          fileNameCamera
            ? [styles.panelReviewButton, { borderColor: 'green', borderWidth: 2 }]
            : styles.panelReviewButton
        }
        onPress={() => openCamera()}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.panelButtonTitle, { marginRight: 10 }]}>Take Photo</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          fileNameLibrary
            ? [styles.panelReviewButton, { borderColor: 'green', borderWidth: 2 }]
            : styles.panelReviewButton
        }
        onPress={async () => {
          pickImage();
        }}
      >
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={[
            styles.panelReviewButton,
            { width: '49%', backgroundColor: '#ce3a39', borderWidth: 0, marginBottom: 13, marginRight: '2%' },
          ]}
          onPress={() => bs.current.snapTo(1)}
        >
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.panelReviewButton,
            { width: '49%', backgroundColor: '#2fbf78', borderWidth: 0, marginBottom: 13 },
          ]}
          onPress={() => {
            bs.current.snapTo(1);
            postPost();
          }}
        >
          <Text style={styles.panelButtonTitle}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <StyledReviewContainer>
      <ReviewTop getPinData={getPinData} pinId={pinId} bs={bs} />
      <ScrollView scrollEventThrottle={16}>
        <View style={{ height: 160, marginTop: 5, marginBottom: 5 }}>
          <ScrollView horizontal={true}>
            {selectedPinReviews.map((review, index) => {
              return (
                <View
                  key={index}
                  style={{ width: 200, marginLeft: 20, borderWidth: 0.7, borderRadius: 5, borderColor: '#dddddd' }}
                >
                  <View style={{ flex: 1, paddingLeft: 15, paddingTop: 15 }}>
                    <HorizontalContainer></HorizontalContainer>
                    <UserDisplay userId={review.userId} />
                    <StarRating size={15} rating={review.rating} style={{ paddingLeft: 5 }} />
                    {review.description && <Text style={{ paddingLeft: 5 }}>{review.description}</Text>}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <GridView navigation={navigation} posts={posts} />
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
