import StarRating from './StarRating';
import InputStarRating from './InputStarRating';
import { Field, Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import getIp from '../ip.js';
import styles from './styles.js';
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react';
import CameraView from '../screens/CameraView';
import {
  StyleSheet,
  Modal,
  TextInput,
  View,
  Platform,
  Image,
  Dimensions
} from 'react-native';
import {
  Colors,
  HorizontalContainer,
  HorizontalContainerTwo,
  StyledReviewContainer,
  LocationImage,
  LocationReviewContainer,
  LocationReviewButton,
  LocationNavigateButton,
  ReviewButtonText,
  LocationDescription,
  LocationTitle,
  LocationLine,
  SubmitReviewButton,
  ReviewContainer,
  AddPictureContainer
} from './styles';
//colors
const { lightBrick } = Colors;
const ReviewTop = (props) => {
  const ip = getIp();
  const { jwt } = useSelector((state) => state.jwtReducer);
  const modalVis = false;
  //modalVisible and setModalVisible for writing a review
  const [takenImage, setTakenImage] = useState(null);
  const [postDescription, setPostDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(modalVis ? true : false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const showModal = (set) => {
    set ? setModalVisible(true) : setModalVisible(false);
  };


  const postReview = async (values) => {
    await axios.post(`http://${ip}:3001/api/reviews/${props.pinId}`, { description: values.description, rating: rating }, { headers: { 'x-auth-token': jwt } })
      .then((response) => {
        console.log(response.data);
        props.setReviews([...props.reviews, response.data]);
        props.getPinData();
      })
      .catch((error) => {
        console.log(description, rating);
        console.error(error.response.data);
      })
  }

  const postPost = async () => {
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('image', { uri: takenImage });
    await axios.post(`http://${ip}:3001/api/posts/${props.pinId}`, { image : formData, description: postDescription }, { headers: { 'x-auth-token' : jwt }})
    .then((response) => {
      console.log(response.data);
      
    })
    .catch((error) => {
      console.error(error);
    })
  }
  const renderContent = () => ( // TODO: make a component for creating a new pin?
  <View style={styles.panel}>
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
      style={styles.panelButton}
      onPress={() => {
        <CameraView setTakenImage={setTakenImage}/>
      }}
    >
      {/* <Text style={styles.panelButtonTitle} onPress={__startCamera}> */}
      <Text style={styles.panelButtonTitle}>Take Photo</Text>
      {/* {capturedImage && <Image source={{ uri: image }} style={{ flex: 1 }} />} */}
    </TouchableOpacity>
    <TouchableOpacity style={styles.panelButton} onPress={openImagePickerAsync}>
      <Text style={styles.panelButtonTitle}>Choose From Library</Text>
    </TouchableOpacity>
    
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity style={[styles.panelButton, { width: '50%', backgroundColor: '#ce3a39', borderWidth: 0, marginBottom: 30  }]} onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.panelButton, { width: '50%', backgroundColor: '#2fbf78', borderWidth: 0, marginBottom: 30 }]}
        onPress={() => {
          postPost();
          bs.current.snapTo(1);
        }}
      >
        <Text style={styles.panelButtonTitle}>Accept</Text>
      </TouchableOpacity>
    </View>
  </View>
);

  return (
    <View>
      <LocationReviewContainer></LocationReviewContainer>
      {/* <LocationImage style={{paddingLeft: 20}} source= {{ uri: image }}></LocationImage> */}
      <LocationTitle style={{ paddingLeft: 20 }}>{props.title}</LocationTitle>
      <View style={{ paddingLeft: 20 }}>
        <StarRating rating={props.rating} size={25} />
        <LocationDescription>{props.description}</LocationDescription>
      </View>

      {/* Modal popup review window */}
      <Modal visible={modalVisible} transparent={true} animationType="slide" presentationStyle="overFullScreen" onRequestClose={() => showModal(!modalVisible)}>
        <View style={stylesReview.viewWrapper}>
          <Formik
            initialValues={{ description: description }}
            onSubmit={(values) => {
              console.log('here');
              postReview(values);
              showModal(false);
            }}
            validator={() => ({})}
          >{({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={stylesReview.modalView}>
              <AddPictureContainer><Ionicons name='ios-camera-outline' size={25} /></AddPictureContainer>
              <InputStarRating setRating={setRating}/>
              <TextInput
                multiline numberOfLines={4} 
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')} 
                style={stylesReview.input} 
                placeholder="Your review here..."
              />
              <SubmitReviewButton onPress={handleSubmit}>
                <ReviewButtonText>Submit Review</ReviewButtonText>
              </SubmitReviewButton>
              <SubmitReviewButton onPress={() => showModal(false)}>
                <ReviewButtonText>Cancel Review</ReviewButtonText>
              </SubmitReviewButton>
            </View>
            )}
          </Formik>
        </View>
      </Modal>
      {/* Open review window */}
      <HorizontalContainerTwo style={{ paddingLeft: 20 }}>
        <LocationReviewButton onPress={() => showModal(true)}>
          <ReviewButtonText>Write a review</ReviewButtonText>
        </LocationReviewButton>
        <LocationNavigateButton>
          <ReviewButtonText>Post</ReviewButtonText>
        </LocationNavigateButton>
      </HorizontalContainerTwo>
      {/* Displays fancy line :) */}
      <LocationLine />
    </View>
  );
  
}
export default ReviewTop;
const stylesReview = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    elevation: 5,
    height: 400,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 7,
  },
  input: {

    width: "80%",
    height: "30%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0)",
    borderWidth: 1,
    marginTop: 1,
    marginBottom: 8,
    backgroundColor: '#D3D3D3',
  },
  reviewsScrollView: {
    position: 'absolute',
    backgroundColor: { lightBrick },
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
});