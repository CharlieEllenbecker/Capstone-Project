import StarRating from './StarRating';
import InputStarRating from './InputStarRating';
import { Field, Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import getIp from '../ip.js';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPinReviews } from '../state/actions/pinActions';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Modal,
  TextInput,
  View,
  Platform,
} from 'react-native';
import {
  Colors,
  HorizontalContainerTwo,
  LocationReviewContainer,
  LocationReviewButton,
  LocationNavigateButton,
  ReviewButtonText,
  LocationDescription,
  LocationTitle,
  LocationLine,
  SubmitReviewButton,
  AddPictureContainer
} from './styles';
//colors
const { lightBrick } = Colors;

const ReviewTop = ({bs, getPinData, pinId}) => {
  const ip = getIp();
  const dispatch = useDispatch();
  const { jwt } = useSelector((state) => state.jwtReducer);
  const { selectedPin, selectedPinReviews } = useSelector((state) => state.pinReducer);
  const modalVis = false;
  //modalVisible and setModalVisible for writing a review
  const [modalVisible, setModalVisible] = useState(modalVis ? true : false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const showModal = (set) => {
    set ? setModalVisible(true) : setModalVisible(false);
  };


  const postReview = async (values) => {
    await axios.post(`http://${ip}:3001/api/reviews/${pinId}`, { description: values.description, rating: rating }, { headers: { 'x-auth-token': jwt } })
      .then((response) => {
        dispatch(setSelectedPinReviews([...selectedPinReviews, response.data]));
        getPinData();
      })
      .catch((error) => {
        console.error(error.response.data);
      })
  }

  return (
    <View>
      <LocationReviewContainer></LocationReviewContainer>
      {/* <LocationImage style={{paddingLeft: 20}} source= {{ uri: image }}></LocationImage> */}
      {selectedPin && <LocationTitle style={{ paddingLeft: 20 }}>{selectedPin.title}</LocationTitle>}
      <View style={{ paddingLeft: 20 }}>
        {selectedPin && <StarRating rating={selectedPin.rating} size={25} />}
        {selectedPin && <LocationDescription>{selectedPin.description}</LocationDescription>}
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
          <ReviewButtonText onPress={() => bs.current.snapTo(0)}>Post</ReviewButtonText>
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