import React, { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import axios from 'axios';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ImageBackground,
  Text,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import * as ImagePicker from 'expo-image-picker';
import { markers, mapDarkStyle, mapStandardStyle } from '../model/mapData';
import HomeScreen from './HomeScreen';
import StarRating from '../components/StarRating';
import { useTheme } from '@react-navigation/native';
import { styles } from '../components/styles';
const { width, height } = Dimensions.get('window');

<<<<<<< HEAD
export default function CameraView({ route, navigation}) {
=======
export default function CameraView({ route, navigation, setTakenImage }) {
>>>>>>> f5bea9d600a6c0692f0f6cf4350739612aaec3c6
  const [capturedImage, setCapturedImage] = React.useState(null);
  const setTakenImage = route.params;
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  //const [camera, setCamera] = useState(null);
  //const [capturedImage, setCapturedImage] = React.useState(null);
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = React.useState('off');

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log(status);
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert('Access denied');
    }
  };

  const takePicture = async () => {
    const data = await camera.takePictureAsync(null);
    //console.log(data);
    setCapturedImage(data.uri);
    setPreviewVisible(true);
    //setStartCamera(false)

    console.log('Taken Picture: ' + capturedImage);
  };
  // if (hasCameraPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
  const __savePhoto = () => {
    setPreviewVisible(false);
    setTakenImage(capturedImage);
    console.log('Taken Picture after save: ' + capturedImage);
  };
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };
  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off');
    } else if (flashMode === 'off') {
      setFlashMode('on');
    } else {
      setFlashMode('auto');
    }
  };
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front');
    } else {
      setCameraType('back');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: '100%',
        }}
      >
        {previewVisible && capturedImage ? (
          <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
        ) : (
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={{ flex: 1 }}
            ref={(r) => {
              camera = r;
            }}
          >
            <View
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: '9%',
                  left: '7%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                {cameraType === 'front' ? null : (
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={{
                      backgroundColor: '#000',
                      borderRadius: 50,
                      height: 35,
                      width: 35,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
<<<<<<< HEAD
                    <Ionicons name="ios-flash" size={30} color={flashMode === 'off' ? '#FFF' : '#fffb05'}/>
=======
                    <Ionicons name="ios-flash" size={30} color={flashMode === 'off' ? '#FFF' : '#fffb05'} />
                    {/* <Text
                      style={{
                        fontSize: 20,
                      }}
                    >
                      ⚡️
                    </Text> */}
>>>>>>> f5bea9d600a6c0692f0f6cf4350739612aaec3c6
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('HomeScreen');
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    borderRadius: 50,
                    height: 35,
                    width: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: '730%',
                  }}
                >
                  <MaterialIcons name="cancel" size={35} color="white" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  padding: 20,
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    alignSelf: 'center',
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* <TouchableOpacity
                      onPress={openImagePickerAsync}
                      style={{
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: 'transparent',
                        height: 35,
                        width: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <MaterialCommunityIcons name="google-photos" size={24} color="white" />
                    </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={takePicture}
                    style={{
                      bottom: 0,
                      borderRadius: 50,
                      backgroundColor: '#fff',
                      width: 70,
                      height: 70,
                      justifyContent: 'center',
                      alignItems: 'center',
                      left: width / 2 - 53,
                    }}
                  />
                  <TouchableOpacity
                    onPress={__switchCamera}
                    style={{
                      bottom: 0,
                      borderRadius: 50,
                      height: 35,
                      width: 35,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                      }}
                    >
                      {<MaterialIcons name="flip-camera-android" size={24} color="white" />}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Camera>
        )}
      </View>
    </View>
  );
}

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  //console.log('sdsfds', photo);
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      <ImageBackground
        source={{ uri: photo }}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                }}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
