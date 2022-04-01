//import react/formik/icons/keyboardAvoidingView
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  TextInput,
  View,
  ScrollView,
  Platform,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import StarRating from '../components/StarRating';
import { Ionicons } from '@expo/vector-icons';

//components
import {
  Colors,
  HorizontalContainer,
  HorizontalContainerTwo,
  StyledContainer,
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
} from './../components/styles';
import colors from './../components/styles';
//colors
const { lightBrick } = Colors;
//axios
import axios from 'axios';

const LocationScreen = ({ route, navigation }) => {
  const {image, title, rating} = route.params;
  //grab marker properties from route
  // const { id } = route.params;


  //modalVisible and setModalVisible for writing a review
  const [modalVisible, setModalVisible] = useState(false);
  const [review, setReview] = useState(null);
  

  //pin properties
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [rating, setRating] = useState('');
  // const [reviews, setReviews] = useState([]);
  // for when images are able to be pulled from db
  // const [image, setImage] = useState('');

  //get the pin data to display on the page
  // const getPinData = async () => {
  //   const ip = config.ip;

  //   const { data } = await axios.get(`http://${ip}:3001/api/pins/${id}`, { headers: { 'x-auth-token': jwt } })
  //   .catch(error => {
  //     console.log(error);
  //   });
  //   console.log(data);

  //   setTitle('Photo Location');
  //   setDescription(data.description);
  //   setRating(data.rating);
  //   setReviews([1, 2, 3, 4]);


  // };
  // getPinData();

  


  //handle deletion of review
  // const handleDelete = async (id) => {
  //   const ip = config.ip;
  //   await axios.delete(`http://${ip}:3001/api/pins/review/${id}`);
    // work on later
  // };

  // //handle adding a review
  // const handleReviewSubmit = async (e, id) => {

  //   e.preventDefault();
  //   const ip = config.ip;

  //   await axios.post(`http://${ip}:3001/api/pins/review/${id}`)
  //   .then((response) => {
  //     const result = response.headers['x-auth-token'];
  //     setJwt(result);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // };

    return (
          <StyledContainer>
            <LocationReviewContainer></LocationReviewContainer>
              <LocationImage source= {image}></LocationImage>
                <LocationTitle>{title}</LocationTitle>
                {/* Navigate to directions - not implemented yet */}
                <StarRating ratings={rating} />
                
                <Modal visible={modalVisible} transparent={true} animationType="slide" presentationStyle="overFullScreen" onRequestClose={() => setModalVisible(!modalVisible)}>
                  <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                      <AddPictureContainer><Ionicons name='ios-camera-outline' size={25}/></AddPictureContainer>
                      <StarRating ratings={rating}/>
                      <TextInput multiline numberOfLines={4} value={review} onChangeText={(value)=>setReview(value)}style={styles.input} placeholder = "Your review here..."></TextInput>
                      <SubmitReviewButton onPress={() => {setModalVisible(false)}}>
                        <ReviewButtonText>Submit Review</ReviewButtonText>
                      </SubmitReviewButton>
                      <SubmitReviewButton onPress={() => {setModalVisible(false) }}>
                        <ReviewButtonText>Cancel Review</ReviewButtonText>
                      </SubmitReviewButton>
                    </View>
                  </View>
                </Modal>
                {/* Open review window */}
                <HorizontalContainerTwo>
                  <LocationReviewButton onPress={() => setModalVisible(true)}>
                    <ReviewButtonText>Write a review</ReviewButtonText>
                  </LocationReviewButton>
                  <LocationNavigateButton>
                    <ReviewButtonText>Navigate</ReviewButtonText>
                    <Ionicons name='ios-navigate' size={20} style={{paddingRight: 1}}/>
                  </LocationNavigateButton>
                  </HorizontalContainerTwo>
                {/* Displays fancy line :) */}
                <LocationLine/>
                {/* Displays all reviews in scrollview for the pin unless there are none */}
                <Text>No reviews for this location yet. Be the first to add one!</Text>
                {/* {reviews.length > 0 ? (
                  <ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    style={styles.reviewsScrollView}
                    contentInset={{
                      // iOS only
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 20,
                    }}
                  contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0,
                  }}
                  >
                  {reviews.map((review) => (
                  <ReviewContainer>
                    <Text>Review</Text>
                   <StarRating rating={4}/>
                   <Text>This is the review</Text>
                  </ReviewContainer>
                  ))}
                  </ScrollView>
                  ) : (<Text>No reviews for this location yet. Be the first to add one!</Text>)
                } */}
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
    height: "50%",
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
    backgroundColor: {lightBrick},
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
});

export default LocationScreen;