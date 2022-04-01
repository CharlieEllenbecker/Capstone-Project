import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Svg, Image as ImageSvg } from 'react-native-svg';
import { styles } from '../components/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.hideButton}>
        <Ionicons name="eye-off-outline" size={23} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
