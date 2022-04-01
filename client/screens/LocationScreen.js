//import react/formik/icons/keyboardAvoidingView
import React, { useState, ImageBackground } from 'react';
import {
  StyleSheet,
  Modal,
  FlatList,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import StarRating from '../components/StarRating';
import KeyboardAvoidingWrapper from './../components/keyboardAvoidingWrapper';
//components
import {
  Colors,
  StyledContainer,
  LocationImage,
  LocationReviewContainer,
  LocationReviewButton,
  ReviewButtonText,
  LocationDescription,
  LocationTitle,
  LocationLine,
  SubmitReviewButton,
} from './../components/styles';
import colors from './../components/styles';
//colors
const { lightBrick } = Colors;
//axios
import axios from 'axios';

const LocationScreen = ({ route, navigation }) => {
//modalVisible and setModalVisible for writing a review
const [modalVisible, setModalVisible] = useState(false);
const [review, setReview] = useState(null);
//grab marker properties from route
const { title, description, image, rating, reviews } = route.params;
    return (
          <StyledContainer>
            <LocationReviewContainer></LocationReviewContainer>
              <LocationImage source= {image}></LocationImage>
              <LocationTitle>{title}</LocationTitle>
                <StarRating ratings={rating} reviews={reviews} />
                <Modal visible={modalVisible} transparent={true} animationType="slide" presentationStyle="overFullScreen" onRequestClose={() => setModalVisible(!modalVisible)}>
                  <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                    <StarRating ratings={rating} reviews={reviews} />
                    <TextInput multiline numberOfLines={4} value={review} onChangeText={(value)=>setReview(value)}style={styles.input} placeholder = "Your review here..."></TextInput>
                    <SubmitReviewButton onPress={() => setModalVisible(false)}>
                    <ReviewButtonText>Submit Review</ReviewButtonText>
                  </SubmitReviewButton>
                  </View>
                  </View>
                </Modal>
                <LocationReviewButton onPress={() => setModalVisible(true)}>
                  <ReviewButtonText>Write a review</ReviewButtonText>
                </LocationReviewButton>
              <LocationLine/>
              <Text>{description}</Text>
              <Text>{review}</Text>
          </StyledContainer>
    );
};

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
    height: 180,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 7,
  },
  input: {
    alignItems: "center",
    width: "80%",
    height: 90,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
    backgroundColor: '#D3D3D3',
  }
});

export default LocationScreen;