import react from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Notification/Update Screen</Text>
      <Button title="Go to profile" onPress={() => navigation.navigate('Profile')} />
      {/* <Button
        title="Got to details screen...again"
        onPress={() => navigation.navigate("Details")}
      /> */}
      {/* <Button title="Got to home" onPress={() => navigation.navigate("Home")} />
      <Button title="Got back" onPress={() => navigation.goBack()} /> */}
    </View>
  );
};

export default NotificationsScreen;
