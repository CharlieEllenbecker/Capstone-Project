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
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPin, setSelectedPinReviews, setSelectedPinPosts } from '../state/actions/pinActions';
//components
import GridView from '../components/GridView';
import ReviewTop from '../components/ReviewTop';
import UserDisplay from '../components/DisplayUser';
import {
  Colors,
  StyledReviewContainer,
  HorizontalContainer,
  ReviewUserName,
  ReviewProfilePic,
} from './../components/styles';
import colors from './../components/styles';
//colors
const { lightBrick } = Colors;
//axios
import axios from 'axios';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

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
  const { pinId } = route.params;
  const ip = getIp();
  const dispatch = useDispatch();
  const { jwt } = useSelector((state) => state.jwtReducer);
  const { selectedPinReviews, selectedPinPosts } = useSelector((state) => state.pinReducer);

  const getPinData = async () => {
    await axios.get(`http://${ip}:3001/api/pins/${pinId}`, { headers: { 'x-auth-token': jwt } })
    .then((response) => {
      dispatch(setSelectedPin(response.data));
    })
    .catch(error => {
      console.log(error);
    });
  };
  
  const getReviews = async () => {
    await axios.get(`http://${ip}:3001/api/reviews/all/${pinId}`, { headers: { 'x-auth-token': jwt } })
    .then((response) => {
      dispatch(setSelectedPinReviews(response.data));
    })
    .catch((error) => {
      console.error(error);
    })
  }
  
  useEffect(() => {
    getPinData();
    getReviews();
  }, []);

  return (
    <StyledReviewContainer>
      <ReviewTop getPinData={getPinData} pinId={pinId}/>
      <ScrollView
        scrollEventThrottle={16}
      >
        <View style={{ height: 160, marginTop:5, marginBottom: 5}}>
          <ScrollView
            horizontal={true}
          >
            {selectedPinReviews.map((review, index) => {
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