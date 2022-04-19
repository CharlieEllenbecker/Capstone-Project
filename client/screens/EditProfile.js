import getIp from '../ip';
import { useSelector, useDispatch } from 'react-redux';
import { deleteJWT } from '../state/actions/jwtActions';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
    View, 
    Image, 
    Dimensions,
    ScrollView } from 'react-native';
import {
    DeleteButton,
    ButtonText,
    ProfilePictureContainer,
    UsernameText,
    BioText,
    VerticalContainer,
    LocationLine,
    EditTextInput,
    EditTextLabel,
  } from '../components/styles';




const EditProfile = ({ route, navigation }) => {
return(
    <View style={{flex: 2, width: '100%', justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
        <ScrollView scrollEventThrottle={16}>
            <VerticalContainer style={{alignItems: 'center'}}>
                <ProfilePictureContainer style={{marginTop: 100, alignItems: 'center', justifyContent: 'center'}}><Ionicons name="ios-add-circle" size={40} color='rgba(0,0,0,0.5)'/></ProfilePictureContainer>
                <UsernameText>Username</UsernameText>
            </VerticalContainer>
            <LocationLine/>
            <VerticalContainer style={{paddingLeft: 50, paddingRight: 50}}>
                <EditTextLabel>Username:</EditTextLabel>
                <EditTextInput></EditTextInput>
                <EditTextLabel>Email:</EditTextLabel>
                <EditTextInput></EditTextInput>
                <EditTextLabel>Bio:</EditTextLabel>
                <EditTextInput></EditTextInput>
                <EditTextLabel>New Password:</EditTextLabel>
                <EditTextInput></EditTextInput>
                <EditTextLabel>Confirm New Password:</EditTextLabel>
                <EditTextInput></EditTextInput>
                <DeleteButton><ButtonText>Delete Account</ButtonText></DeleteButton>
            </VerticalContainer>
        </ScrollView>
    </View>
);
}
export default EditProfile;