import styled from 'styled-components/native'
// import styled from 'styled-components';
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
}

const { primary, secondary, secondaryLight, tetriary, lightBrick, brick, darkBrick, green, red } = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: ${primary};
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
    resizeMode: contain;
    flex: 1;
    height: 785px;
    justifyContent: center;
    padding-top: ${StatusBarHeight + 30}px;
    padding: 25px;
`;

export const SignupBackground = styled.ImageBackground`
    resizeMode: cover;
    flex: 1;
    justifyContent: center;
    padding-top: ${StatusBarHeight + 30}px;
    padding: 25px;
    padding-bottom: 110px;
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