import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ExploreScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>ExploreScreen</Text>
      <Button title="Go to profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
