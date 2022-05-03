import { useNavigation } from '@react-navigation/native-stack';
import {
    View, 
    Image, 
    Dimensions,
    TouchableOpacity, 
    ImageBackground} from 'react-native';
import getIp from '../ip';

const GridView = ({ navigation, posts }) => {
    var {width, height} = Dimensions.get('screen');

    const gridView = (posts, width, height) => {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {renderImages(posts, width, height)}
            </View>
        );
    }
      
    const renderImages = (posts, width, height) => {
        return posts.map((post, index) => {
            const ip = getIp();
            const url = `http://${ip}:3001/${post.postPictureFileName}`;
            return (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Post', {postId: post._id})}>
                <View style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
                    <ImageBackground style={{ flex: 1, width: undefined, height: undefined, borderColor: '#FFFFFF', borderWidth: 1 }} source={{ uri : url }}/>
                </View>
            </TouchableOpacity>
            );
        });
    }
      
    return (
      gridView(posts, width, height)
    );
}
export default GridView;