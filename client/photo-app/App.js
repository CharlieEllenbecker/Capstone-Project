import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, 
        Text, 
        View, 
        Button, 
        TextInput, 
        Alert, 
        ImageBackground,
        TouchableOpacity, 
      } from 'react-native';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <ImageBackground style={login.image} resizeMode="cover" source={require("./assets/loginBackground.jpg")}>
      <View style={login.container}>
      

        
        <View style={login.inputView}>
          <TextInput
            style={login.TextInput}
            placeholder={'Username'}
            placeholderTextColor="#003f5c"
            onChangeText={(username) => setUsername(username)}
          />
        </View>

        <View style={login.inputView}>
          <TextInput
            style={login.TextInput}
            placeholder={'Password'}
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity style={login.loginBtn}>
          <Text style={login.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
  


const login = StyleSheet.create({
container: {
  flex: 0.3,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: "#000000c0",
  borderRadius: 10,
},
inputView: {
  backgroundColor: "#E6B0AA",
  borderRadius: 30,
  width: "15%",
  height: 45,
  marginBottom: 20,
  alignItems: "center",
  justifyContent: "center"
},
TextInput: {
  height: 50,
  width: 200,
  flex: 1,
  padding: 10,
  marginRight: 20,
},
image: {
  flex: 1,
  width: "100%",
  justifyContent: "center",
},
loginBtn: {
  width: "20%",
  borderRadius: 25,
  height: 50,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 40,
  backgroundColor: "#CB4335",
},
loginText: {
  color: "#17202A",

}
});
