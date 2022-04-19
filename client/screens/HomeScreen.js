import React, { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import axios from 'axios';
import getIp from '../ip';
import { useSelector, useDispatch } from 'react-redux';
import { setAllPins } from '../state/actions/pinActions';
import { setTags } from '../state/actions/tagActions';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated as OldAnimated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ImageBackground,
  Alert,
} from 'react-native';

import CameraView from './CameraView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import * as ImagePicker from 'expo-image-picker';
import { mapDarkStyle, mapStandardStyle } from '../model/mapData';

import StarRating from '../components/StarRating';
import { useTheme } from '@react-navigation/native';
import { styles } from '../components/styles';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const HomeScreen = ({ navigation, route }) => {
  //const { image, dummy } = route.params;
  React.useEffect(() => {
    if (route.params?.image) {
      setSelectedImage(route.params.image);
      console.log('image: ' + route.params.image);
    }
  }, [route.params?.image]);

  const theme = useTheme();

  const initialMapState = {
    region: {
      latitude: 43.041,
      longitude: -87.909,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  const [markers, setMarkers] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [state, setState] = React.useState(initialMapState);
  const [cardVisible, setCardVisible] = React.useState(true);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [coordinate, setCoordinate] = React.useState({});

  const ip = getIp();
  const { jwt } = useSelector((state) => state.jwtReducer);
  const { allPins } = useSelector((state) => state.pinReducer);
  const { tags } = useSelector((state) => state.tagReducer);
  const dispatch = useDispatch();

  // Get all the pins
  const getAllPins = async () => {
    await axios
      .get(`http://${ip}:3001/api/pins/`, { headers: { 'x-auth-token': jwt } })
      .then((response) => {
        dispatch(setAllPins(response.data));
        setMarkers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //Get all the tags
  const getAllCategories = async () => {
    await axios
      .get(`http://${ip}:3001/api/tags/`, { headers: { 'x-auth-token': jwt } })
      .then((response) => {
        dispatch(setTags(response.data));
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  let mapIndex = 0;
  let mapAnimation = new OldAnimated.Value(0);
  useEffect(() => {
    getAllPins();
    getAllCategories();
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      clearTimeout(regionTimeout);
      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              //latitudeDelta: state.region.latitudeDelta,
              //longitudeDelta: state.region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  }, []);
  const interpolations = markers.map((marker, index) => {
    const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];
    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });
    return { scale };
  });
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  const onMarkerPress = (mapEventData) => {
    // if (!cardVisible) {
    //   setCardVisible(true);
    // }
    const markerID = mapEventData._targetInst.return.key;
    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    if (cardVisible) {
      _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    } else {
      setCardVisible(true);
      _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }
  };
  // const handlePress = (e) => {
  //   //setCardVisible(!cardVisible);
  //   console.log(cardVisible);
  // };
  const handleLongPress = (e) => {
    bs.current.snapTo(0);
    setCoordinate(e.nativeEvent.coordinate);
  };

  const addMarker = () => {
    //console.log(image);
    //console.log('Before the if');
    if (title.length > 0 && description.length > 0 && selectedImage != null) {
      setMarkers({
        markers: [
          ...markers,
          {
            coordinate: {
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              // latitudeDelta: state.region.latitudeDelta,
              // longitudeDelta: state.region.longitudeDelta,
            },
            title: title,
            description: description,
            image: selectedImage,
            //image: image,
          },
        ],
      });
      // setTitle('');
      // setDescription('');
      // setSelectedImage(null);
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
    console.log(result.uri);
    setSelectedImage(result.uri);
    // if (result.cancelled === true) {
    //   startCamera ? setStartCamera(false) : null;
    //   return;
    // }
    //require('../assets/banners/food-banner1.jpg')
  };

  const renderContent = () => (
    <View style={styles.panel}>
      <TextInput
        placeholder="Title"
        placeholderTextColor="#808080"
        autoCapitalize="none"
        style={styles.pinDetails}
        onChangeText={(newText) => {
          setTitle(newText);
          console.log('Image: ', selectedImage);
        }}
      />
      <TextInput
        placeholder="Description"
        placeholderTextColor="#808080"
        autoCapitalize="none"
        style={styles.pinDetails}
        onChangeText={(newText) => {
          setDescription(newText);
        }}
      />

      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          navigation.navigate('CameraView');
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
        <TouchableOpacity style={[styles.panelButton, { width: '50%' }]} onPress={() => bs.current.snapTo(1)}>
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.panelButton, { width: '50%', backgroundColor: '#095de3' }]}
          onPress={() => {
            addMarker();
            bs.current.snapTo(1);
          }}
        >
          <Text style={styles.panelButtonTitle}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <MapView
          ref={_map}
          initialRegion={state.region}
          style={styles.container}
          provider={PROVIDER_GOOGLE}
          customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
          onLongPress={handleLongPress}
          //onLongPress={<addMarker state={state} />}
        >
          {markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };

            return (
              <MapView.Marker
                key={index}
                coordinate={{ latitude: marker.coordinate.latitude, longitude: marker.coordinate.longitude }}
                onPress={(e) => onMarkerPress(e)}
              >
                <OldAnimated.View style={[styles.markerWrap]}>
                  <OldAnimated.Image
                    source={require('../assets/map_marker.png')}
                    style={[styles.marker, scaleStyle]}
                    resizeMode="cover"
                  />
                </OldAnimated.View>
              </MapView.Marker>
            );
          })}
        </MapView>

        {cardVisible ? (
          <TouchableOpacity style={styles.hideButton} onPress={() => setCardVisible(!cardVisible)}>
            <Ionicons name="ios-list" size={23} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.showButton} onPress={() => setCardVisible(!cardVisible)}>
            <Ionicons name="ios-list-outline" size={23} />
          </TouchableOpacity>
        )}

        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search here"
            placeholderTextColor="#808080"
            autoCapitalize="none"
            style={{ flex: 1, padding: 0 }}
          />
          <Ionicons name="ios-search" size={20} />
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          style={styles.scrollView}
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET,
          }}
          contentContainerStyle={{
            paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
          }}
        >
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.chipsItem}>
              {category.icon}
              <Text>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {cardVisible ? (
          <OldAnimated.ScrollView
            ref={_scrollView}
            horizontal
            pagingEnabled
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment="center"
            style={styles.scrollView}
            contentInset={{
              top: 0,
              left: SPACING_FOR_CARD_INSET,
              bottom: 0,
              right: SPACING_FOR_CARD_INSET,
            }}
            contentContainerStyle={{
              paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
            }}
            onScroll={OldAnimated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: mapAnimation,
                    },
                  },
                },
              ],
              { useNativeDriver: true },
            )}
          >
            {markers.map((marker, index) => (
              <View style={styles.card} key={index}>
                {/* source={{ uri: selectedImage.localUri }} */}
                <Image source={{ uri: marker.image }} style={styles.cardImage} resizeMode="cover" />
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                  <StarRating rating={marker.rating} size={18} />
                  {marker.description && <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>}
                  <View style={styles.button}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('LocationScreen', { pinId: marker._id });
                      }}
                      style={[
                        styles.textSign,
                        {
                          color: '#FF6347',
                        },
                      ]}
                    >
                      <Text style={styles.textSign}>See Location</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </OldAnimated.ScrollView>
        ) : null}
        <BottomSheet
          ref={bs}
          snapPoints={[300, 0]}
          renderContent={renderContent}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
      </View>
    </View>
  );
};
export default HomeScreen;
