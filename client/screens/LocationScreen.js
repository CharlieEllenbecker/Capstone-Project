//import react/formik/icons/keyboardAvoidingView
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Modal,
  Header,
  Text,
  TextInput,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import StarRating from '../components/StarRating';
import { Ionicons } from '@expo/vector-icons';
import config from '../ip.json';
//components
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
  BackButton,
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

const images = [
  require('../assets/banners/food-banner1.jpg'),
  require('../assets/banners/food-banner4.jpg'),
  require('../assets/banners/food-banner3.jpg'),
  require('../assets/banners/food-banner2.jpg'),
  require('../assets/banners/food-banner5.jpg'),
  require('../assets/banners/food-banner4.jpg'),
  require('../assets/banners/food-banner3.jpg'),
  require('../assets/banners/food-banner2.jpg'),
  require('../assets/banners/food-banner4.jpg'),
  require('../assets/banners/food-banner3.jpg'),
  require('../assets/banners/food-banner2.jpg'),
  require('../assets/banners/food-banner4.jpg'),
  require('../assets/banners/food-banner3.jpg'),
  require('../assets/banners/food-banner2.jpg'),
  require('../assets/banners/food-banner4.jpg'),
  require('../assets/banners/food-banner3.jpg'),
  require('../assets/banners/food-banner2.jpg')
]
const gridView = (images, width, height) => {
  return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {renderImages(images, width, height)}
      </View>
  );
}

const renderImages = (images, width, height) => {
  return images.map((image) => {
      return <View style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
          <Image style={{ flex: 1, width: undefined, height: undefined, borderColor: '#FFFFFF', borderWidth: 1 }} source={image}/>
      </View>
  });
}
const LocationScreen = ({ route, navigation }) => {
  const {image, title, rating} = route.params;
  var {width, height} = Dimensions.get('screen');
  //grab marker properties from route
  // const { id } = route.params;

  const modalVis = false;
  const reviewVis = null;
  //modalVisible and setModalVisible for writing a review
  const [modalVisible, setModalVisible] = useState(modalVis ? true : false);
  const [review, setReview] = useState(reviewVis ? '' : null);
  
  const showModal = (set) => {
    set ? setModalVisible(true) : setModalVisible(false);
  };

  const handleReviewSubmit = (set) => {
    if (set !== '') {
      setReview(set);
    }
    return;
  }
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
          <StyledReviewContainer>
            <LocationReviewContainer></LocationReviewContainer>
              <LocationImage style={{paddingLeft: 20}} source= {{ uri: image }}></LocationImage>
                <LocationTitle style={{paddingLeft: 20}}>{title}</LocationTitle>
                {/* Navigate to directions - not implemented yet */}
                <View style={{paddingLeft: 20}}><StarRating ratings={rating} /></View>
                
                <Modal visible={modalVisible} transparent={true} animationType="slide" presentationStyle="overFullScreen" onRequestClose={() => showModal(!modalVisible)}>
                  <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                      <AddPictureContainer><Ionicons name='ios-camera-outline' size={25}/></AddPictureContainer>
                      <StarRating ratings={rating}/>
                      <TextInput multiline numberOfLines={4} value={review} style={styles.input} placeholder = "Your review here..."></TextInput>
                      <SubmitReviewButton onPress={() => {showModal(false)}}>
                        <ReviewButtonText>Submit Review</ReviewButtonText>
                      </SubmitReviewButton>
                      <SubmitReviewButton onPress={() => {showModal(false)}}>
                        <ReviewButtonText>Cancel Review</ReviewButtonText>
                      </SubmitReviewButton>
                    </View>
                  </View>
                </Modal>
                {/* Open review window */}
                <HorizontalContainerTwo style={{paddingLeft: 20}}>
                  <LocationReviewButton onPress={() => showModal(true)}>
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
                <ScrollView
                  scrollEventThrottle={16}
                >
                  {/* {reviews.length > 0 ? ( */}
                  <View style={{ height: 160, marginTop:5, marginBottom: 5}}>
                    <ScrollView
                      horizontal={true}
                    >
                      <View style={{ height: 160, width: 200, marginLeft: 20, borderWidth: 0.7, borderRadius: 5, borderColor: '#dddddd' }}>
                        <View style={{flex: 1, paddingLeft: 15, paddingTop: 15 }}>
                          <Text>This is a review scrollview!</Text>
                        </View>
                      </View>
                      <View style={{ height: 160, width: 200, marginLeft: 20, borderWidth: 0.7, borderRadius: 5, borderColor: '#dddddd' }}>
                        <View style={{flex: 1, paddingLeft: 15, paddingTop: 15 }}>
                          <Text>This is a review scrollview 2!</Text>
                        </View>
                      </View>
                      <View style={{ height: 160, width: 200, marginLeft: 20, borderWidth: 0.7, borderRadius: 5, borderColor: '#dddddd' }}>
                        <View style={{flex: 1, paddingLeft: 15, paddingTop: 15 }}>
                          <Text>This is a review scrollview 3!</Text>
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                  {/*) : (<Text>No reviews for this location yet. Be the first to add one!</Text>) } */}
                  {gridView(images, width, height)}
                </ScrollView>
          </StyledReviewContainer>
          
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
    backgroundColor: {lightBrick},
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
});

export default LocationScreen;