import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Svg, Image as ImageSvg } from 'react-native-svg';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
      <Image style={{ height: 50, width: 50 }} source={require('../assets/signupBackground.jpg')} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
