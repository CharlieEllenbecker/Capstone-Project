import styled from 'styled-components/native';
import { createGlobalStyle } from 'styled-components';
import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
  primary: '#E6B0AA',
  secondary: '#433366',
  secondaryLight: '#67548e',
  tetriary: '#fff',
  lightBrick: '#E6B0AA',
  brick: '#CB4335',
  darkBrick: '#7B241C',
  green: '#2FB015',
  red: '#FF0000',
  lighterPurp: '#8e84a3',
  purp: '#474251',
  lightGrey: '#D3D3D3',
};

const { primary, secondary, secondaryLight, tetriary, lightBrick, brick, darkBrick, green, red, lightGrey } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 20px;
  padding-top: ${StatusBarHeight + 10}px;
  background-color: #ffffff;
`;
export const StyledReviewContainer = styled.View`
  flex: 1;
  width: 100%;
  padding-top: ${StatusBarHeight + 10}px;
  background-color: #ffffff;
`;
export const InnerContainer = styled.KeyboardAvoidingView`
    flex: 1;
    width: 100%;
    align-items: center;
    'rgba(52, 52, 52, 0.8)';
`;

export const PageLogo = styled.Image`
  max-width: 250px;
  max-height: 200px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${(props) => (props.type == 'login' ? secondaryLight : secondary)};
  padding: 10px;
`;

export const LoginBackground = styled.ImageBackground`
  flex: 1;
  height: 785px;
  justify-content: center;
  padding-top: ${StatusBarHeight + 30}px;
  padding: 25px;
`;

export const SignupBackground = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding-top: ${StatusBarHeight + 30}px;
  padding: 25px;
  padding-bottom: 110px;
  height: 100%;
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #433366;
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${lightBrick};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 15px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${brick};
`;

export const StyledTextLabel = styled.Text`
  color: ${tetriary};
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 16px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 16px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;
export const EditLeftIcon = styled.View`
  left: 16px;
  top: 30px;
  position: absolute;
  z-index: 1;
`;

export const EditRightIcon = styled.TouchableOpacity`
  right: 16px;
  top: 32px;
  position: absolute;
  z-index: 1;
`;
export const LoginButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brick};
  justify-content: center;
  align-content: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
`;

export const SignupButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${darkBrick};
  justify-content: center;
  align-content: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 15px;
  text-align: center;
`;

export const ErrorMsg = styled.Text`
  text-align: center;
  font-size: 15px;
  color: ${(props) => (props.type == 'Success' ? green : red)};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkBrick};
  margin-vertical: 10px;
`;

//Location Screen
export const LocationImage = styled.Image`
  max-height: 200px;
  width: 350px;
  border-width: 2px;
  border-radius: 10px;
  border-color: #000000;
`;
export const LocationTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  padding: 1px;
`;
export const LocationDescription = styled.Text`
  font-size: 15px;
  color: #000000;
`;
export const LocationReviewContainer = styled.View`
  width: 100%;
  height: 30px;
`;
export const LocationLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: #000000;
  margin-vertical: 5px;
`;
export const LocationReviewButton = styled.TouchableOpacity`
  width: 40%;
  justify-content: center;
  align-content: center;
  border-radius: 5px;
  border-color: #000000;
  border-width: 0.7px;
  height: 25px;
  margin-vertical: 5px;
  margin-right: 5px;
`;
export const BackButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  border-color: #000000;
  border-width: 0.7px;
  margin-vertical: 5px;
  align-content: center;
  justify-content: center;
  background-color: ${brick};
  z-index: 1;
  position: absolute;
`;
export const SubmitReviewButton = styled.TouchableOpacity`
  width: 80%;
  justify-content: center;
  align-content: center;
  border-radius: 5px;
  border-color: #000000;
  border-width: 0.7px;
  height: 40px;
  margin-vertical: 5px;
`;
export const ReviewButtonText = styled.Text`
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  color: #000000;
`;
export const LocationNavigateButton = styled.TouchableOpacity`
  width: 30%;
  justify-content: space-around;
  flex-direction: row;
  align-content: center;
  border-radius: 5px;
  border-color: #000000;
  border-width: 0.5px;
  height: 25px;
  padding: 2px;
  margin-vertical: 5px;
`;
export const ReviewContainer = styled.View`
  padding: 5px;
  width: 100%;
  background-color: #d3d3d3;
  flex: 1;
  justify-content: center;
  border-radius: 10px;
`;
export const ReviewProfilePic = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-content: center;
  margin-right: 10px;
`;
export const ReviewUserName = styled.Text`
  font-size: 15px;
  color: #000000;
`;
//Profile Page
export const ProfileContainer = styled.View`
  flex: 1;
  padding-top: ${StatusBarHeight + 10}px;
  background-color: #ffffff;
`;
export const UserContainer = styled.View`
  flex-direction: row;
  padding-bottom: 5px;
  padding-left: 25px;
  padding-right: 25px;
`;
export const ProfilePictureContainer = styled.TouchableOpacity`
  width: 160px;
  height: 160px;
  border-radius: 80px;
`;
export const ProfilePicContainer = styled.Image`
  width: 160px;
  height: 160px;
`;
export const EditButtonText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;

export const EditProfileButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #ffffff;
  justify-content: center;
  align-content: center;
  border-radius: 5px;
  border-color: #000000;
  border-width: 0.5px;
  height: 30px;
  margin-vertical: 5px;
  margin: auto;
`;

export const UsernameText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;

export const BioText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;

export const GridView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const NumberOfPinsContainer = styled.View`
  width: 150px;
  height: 50px;
  flex-direction: row;
  justify-content: space-around;
  margin: auto;
`;

export const HorizontalContainer = styled.View`
  flex-direction: row;
  padding: 5px;
  justify-content: space-around;
`;
export const HorizontalContainerTwo = styled.View`
  flex-direction: row;
  padding: 5px;
  justify-content: flex-start;
`;
export const NumberOfPinsText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  justify-content: space-around;
  padding-left: 10px;
  padding-right: 10px;
`;

export const NumberOfPinsNumber = styled.Text`
  font-size: 15px;
  text-align: center;
`;
export const VerticalContainer = styled.View`
  flex-direction: column;
  padding: 5px;
`;
export const HeaderContainer = styled.View`
  height: 25px;
  flex-direction: row;
  justify-content: space-between;
`;
export const SettingsButton = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
  margin-left: 20px;
`;
export const LogoutButton = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
  margin-right: 20px;
`;
export const AddPictureContainer = styled.TouchableOpacity`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${brick};
  align-items: center;
  justify-content: center;
`;

//Edit Profile Screen

export const EditTextLabel = styled.Text`
  color: #000000;
  font-size: 13px;
  text-align: left;
`;

export const EditTextInput = styled.TextInput`
  background-color: rgba(0, 0, 0, 0.15);
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  border-color: ${brick};
  font-size: 15px;
  height: 50px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: #000000;
`;

export const DeleteButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brick};
  justify-content: center;
  align-content: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
`;



const { width, height } = Dimensions.get('screen');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsSelector: {
    position: 'absolute',
    paddingHorizontal: 10,
    elevation: 10,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 45 : 35,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
    elevation: 5,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsItemHeader: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  panel: {
    padding: 13,
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
    elevation: 10,
    paddingBottom: 20,
    zIndex: 10,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#00000040',
    //marginBottom: 10,
  },
  panelTitle: {
    fontSize: 25,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 5,
  },
  panelButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 0.5,
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 4,
  },
  panelButtonTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  hideButton: {
    elevation: 2,
    position: 'absolute',
    right: 0,
    bottom: 240,
    margin: 5,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    zIndex: 2,
  },
  showButton: {
    elevation: 2,
    position: 'absolute',
    right: 0,
    bottom: 8,
    margin: 5,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    zIndex: 2,
  },
  pinDetails: {
    //position: 'absolute',
    //marginTop: Platform.OS === 'ios' ? 40 : 20,
    //flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 7,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 10,
    marginBottom: 5,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
