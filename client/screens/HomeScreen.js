import { useEffect, useState, createRef, useRef } from 'react';
import { Camera } from 'expo-camera';
import axios from 'axios';
import getIp from '../ip';
import { useSelector, useDispatch } from 'react-redux';
import { setAllPins, setUserSpecificPins, setFilteredPins } from '../state/actions/pinActions';
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

import ListView from '../components/ListView.js';
import CameraView from './CameraView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import * as ImagePicker from 'expo-image-picker';
import { mapDarkStyle, mapStandardStyle } from '../model/mapData';

import MapPin from '../components/MapPin';
import StarRating from '../components/StarRating';
import { useTheme } from '@react-navigation/native';
import { styles } from '../components/styles';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const HomeScreen = ({ navigation, route }) => {
  //const { image, dummy } = route.params;

  useEffect(() => {
    if (route.params?.image) {
      setSelectedImage(route.params.image);
    }
  }, [route.params?.image]);

  const theme = useTheme();

  const region = {
    latitude: 43.041,
    longitude: -87.909,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');

  const [filter, setFilter] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [coordinate, setCoordinate] = useState({});

  const ip = getIp();
  const dispatch = useDispatch();
  const { jwt } = useSelector((state) => state.jwtReducer);
  const { allPins } = useSelector((state) => state.pinReducer);
  const { userSpecificPins } = useSelector((state) => state.pinReducer);
  const { filteredPins } = useSelector((state) =>  state.pinReducer);
  const { tags } = useSelector((state) => state.tagReducer);

  // Get all the pins
  const getAllPins = async () => {
    await axios
      .get(`http://${ip}:3001/api/pins/`, { headers: { 'x-auth-token': jwt } })
      .then((response) => {
        dispatch(setAllPins(response.data));
        dispatch(setFilteredPins(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getMyPins = async () => {
    await axios
      .get(`http://${ip}:3001/api/pins/my`, { headers: { 'x-auth-token': jwt } })
      .then((response) => {
        dispatch(setUserSpecificPins(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getAllTags = async () => {
    await axios
      .get(`http://${ip}:3001/api/tags/`, { headers: { 'x-auth-token': jwt } })
      .then((response) => {
        dispatch(setTags(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  let mapIndex = 0;
  let mapAnimation = new OldAnimated.Value(0);
  useEffect(() => {
    getAllPins();
    getMyPins();
    getAllTags();
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= allPins.length) {
        index = allPins.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      clearTimeout(regionTimeout);
      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = allPins[index];
          _map.current.animateToRegion(
            {
              ...coordinate
            },
            350,
          );
        }
      }, 10);
    });
  }, []);

  const interpolations = filteredPins.map((pin, index) => {
    const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];
    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });
    return { scale };
  });

  const _map = useRef(null);
  const _scrollView = useRef(null);
  const onMarkerPress = (mapEventData) => {
    
    const markerID = mapEventData._targetInst.return.key;
    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true })
    
  };

  const handleLongPress = (e) => {
    bs.current.snapTo(0);
    setCoordinate(e.nativeEvent.coordinate);
  };

  const filterPins = (tagFilter) => {
    dispatch(setFilteredPins(allPins.filter(pin => pin.tags.some(tag => tag.name === tagFilter))));
  };

  const addMarker = () => {
    // TODO: utilize endpoint
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

    setSelectedImage(result.uri);
    // if (result.cancelled === true) {
    //   startCamera ? setStartCamera(false) : null;
    //   return;
    // }
    //require('../assets/banners/food-banner1.jpg')
  };

  const renderContent = () => ( // TODO: make a component for creating a new pin?
    <View style={styles.panel}>
      <TextInput
        placeholder="Title"
        placeholderTextColor="#808080"
        autoCapitalize="none"
        style={styles.pinDetails}
        onChangeText={(newText) => {
          setTitle(newText);
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

      <View style={{ marginBottom: 5, height: 30 }}>
        <ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          height={30}
          style={styles.chipsSelector}
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
          {tags.map((tag, index) => (
            <TouchableOpacity key={index} style={[styles.chipsItemHeader, {borderColor: '#000000', borderWidth: 0.7, height: 30}]}>
              <Text>{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

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
        <TouchableOpacity style={[styles.panelButton, { width: '50%', backgroundColor: '#ce3a39', borderWidth: 0, marginBottom: 30  }]} onPress={() => bs.current.snapTo(1)}>
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.panelButton, { width: '50%', backgroundColor: '#2fbf78', borderWidth: 0, marginBottom: 30 }]}
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
  const bs = createRef();
  const fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <MapView
          ref={_map}
          initialRegion={region}
          style={styles.container}
          provider={PROVIDER_GOOGLE}
          customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
          onLongPress={handleLongPress}
          //onLongPress={<addMarker state={state} />}
        >
          {filteredPins.map((pin, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                }
              ]
            };

            return (
              <MapPin key={index} pin={pin} scaleStyle={scaleStyle} onMarkerPress={onMarkerPress} />
            );
          })}
        </MapView>

        <ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          style={styles.chipsScrollView}
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
          <TouchableOpacity style={styles.chipsItem} onPress={() => {setFilteredPins(allPins)}}>
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chipsItem} onPress={() => {setFilteredPins(userSpecificPins)}}>
            <Text>My</Text>
          </TouchableOpacity>
          
          {tags.map((tag, index) => (
            <TouchableOpacity key={index} style={styles.chipsItem} onPress={() => {
              setFilter(tag)
              filterPins(filter)
              }}>
              <Text>{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
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
            {filteredPins.map((pin, index) => (
              <ListView pin={pin} key={index} navigation={navigation}/>
            ))}
          </OldAnimated.ScrollView>
        
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