import StarRating from './StarRating';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import getIp from '../ip.js';
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react';
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
  const reviewVis = null;
  //modalVisible and setModalVisible for writing a review
  const [modalVisible, setModalVisible] = useState(modalVis ? true : false);
  const [description, setDescription] = useState(reviewVis ? '' : null);

  const showModal = (set) => {
    set ? setModalVisible(true) : setModalVisible(false);
  };

  const postReview = async (description) => {
    await axios.post(`http://${ip}:3001/api/reviews/${props.pinId}`, { description: description, rating: 5 }, { headers: { 'x-auth-token': jwt } })
      .then((response) => {
        props.setReviews([...props.reviews, response.data]);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    <View>
      <LocationReviewContainer></LocationReviewContainer>
      {/* <LocationImage style={{paddingLeft: 20}} source= {{ uri: image }}></LocationImage> */}
      <LocationTitle style={{ paddingLeft: 20 }}>{props.title}</LocationTitle>
      <View style={{ paddingLeft: 20 }}>
        <StarRating ratings={props.rating} size={25} />
        <LocationDescription>{props.description}</LocationDescription>
      </View>

      {/* Modal popup review window */}
      <Modal visible={modalVisible} transparent={true} animationType="slide" presentationStyle="overFullScreen" onRequestClose={() => showModal(!modalVisible)}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <AddPictureContainer><Ionicons name='ios-camera-outline' size={25} /></AddPictureContainer>
            <StarRating size={25} ratings={props.rating} />
            <TextInput multiline numberOfLines={4} onChangeText={setDescription} value={description} style={styles.input} placeholder="Your review here..."></TextInput>
            <SubmitReviewButton onPress={() => { showModal(false), postReview(description) }}>
              <ReviewButtonText>Submit Review</ReviewButtonText>
            </SubmitReviewButton>
            <SubmitReviewButton onPress={() => { showModal(false) }}>
              <ReviewButtonText>Cancel Review</ReviewButtonText>
            </SubmitReviewButton>
          </View>
        </View>
      </Modal>
      {/* Open review window */}
      <HorizontalContainerTwo style={{ paddingLeft: 20 }}>
        <LocationReviewButton onPress={() => showModal(true)}>
          <ReviewButtonText>Write a review</ReviewButtonText>
        </LocationReviewButton>
        <LocationNavigateButton>
          <ReviewButtonText>Navigate</ReviewButtonText>
          <Ionicons name='ios-navigate' size={20} style={{ paddingRight: 1 }} />
        </LocationNavigateButton>
      </HorizontalContainerTwo>
      {/* Displays fancy line :) */}
      <LocationLine />
    </View>
  );
}
export default ReviewTop;
const styles = StyleSheet.create({
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