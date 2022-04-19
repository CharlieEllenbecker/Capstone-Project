//import react/formik/icons/keyboardAvoidingView
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform
} from 'react-native';
import StarRating from '../components/StarRating';
import getIp from '../ip';
import { useSelector, useDispatch, getState } from 'react-redux';
//components
import GridView from '../components/GridView';
import ReviewTop from '../components/ReviewTop';
import {
  Colors,
  StyledReviewContainer,
  HorizontalContainer,
  ReviewProfilePic,
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

const LocationScreen = ({ route, navigation }) => {
  // user, ip, jwt variables
  const { pinId } = route.params;
  const ip = getIp();
  const { jwt } = useSelector((state) => state.jwtReducer);

  //  pin properties
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState([]);

  //  get the pin data to display on the page
  const getPinData = async () => {
    await axios.get(`http://${ip}:3001/api/pins/${pinId}`, { headers: { 'x-auth-token': jwt } })
    .then((response) => {
      setTitle(response.data.title);
      setDescription(response.data.description);
      setRating(response.data.rating);
    })
    .catch(error => {
      console.log(error);
    });
  };
  
  const getReviews = async () => {
    await axios.get(`http://${ip}:3001/api/reviews/all/${pinId}`, { headers: { 'x-auth-token': jwt } })
    .then((response) => {
      setReviews(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
  }
  
  const postReview = async (review) => {  // TODO: This should be moved to a create post component where you pass in the pinId as a prop to make the axios call
    await axios.post(`http://${ip}:3001/api/reviews/${pinId}`, {review} ,{ headers: { 'x-auth-token': jwt } })
    .then((response) => {
      setReviews([...reviews, response.data]);
    })
    .catch((error) => {
      console.error(error);
    })
  }
  
  useEffect(() => {
    getPinData();
    getReviews();
  },[]);

  return (
    <StyledReviewContainer>
      <ReviewTop title={title} description={description} rating={rating} reviews={reviews} setReviews={setReviews} pinId={pinId}/>
      <ScrollView
        scrollEventThrottle={16}
      >
        <View style={{ height: 160, marginTop:5, marginBottom: 5}}>
          <ScrollView
            horizontal={true}
          >
            {reviews.map((review, index) => {
              return (
              <View key={index} style={{ margin: 5, width: 200, marginLeft: 20, borderWidth: 0.7, borderRadius: 5, borderColor: '#dddddd' }}>
                <View style={{flex: 1, paddingLeft: 15, paddingTop: 15 }}>
                  <HorizontalContainer>
                  </HorizontalContainer>
                  <StarRating size={15} rating={review.rating} style={{ paddingLeft: 5 }}/>
                  {review.description && <Text style={{ paddingLeft: 5 }}>{review.description}</Text>}
                </View>
              </View>
              );
            })}
          </ScrollView>
        </View>
        <GridView images={images}/>
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