import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Svg, Image as ImageSvg } from 'react-native-svg';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
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
