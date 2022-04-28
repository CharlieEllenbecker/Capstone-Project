import { useNavigation } from '@react-navigation/native-stack';
import {
    View, 
    Image, 
    Dimensions,
    TouchableOpacity, 
    ImageBackground} from 'react-native';
import getIp from '../ip';

const GridView = ({ navigation, images }) => {
    var {width, height} = Dimensions.get('screen');
    const gridView = (images, width, height) => {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {renderImages(images, width, height)}
            </View>
        );
      }
      
      const renderImages = (images, width, height) => {
        return images.map((image, index) => {
            const ip = getIp();
            const url = `http://${ip}:3001/${image.postPictureFileName}`;
            return (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Post', {postId: image._id})}>
                <View style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
                    <ImageBackground style={{ flex: 1, width: undefined, height: undefined, borderColor: '#FFFFFF', borderWidth: 1 }} source={{ uri : url }}/>
                </View>
            </TouchableOpacity>
            );
        });
      }
      
    return (
      gridView(images, width, height)
    );
}
export default GridView;