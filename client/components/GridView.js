import {
    View, 
    Image, 
    Dimensions } from 'react-native';

const GridView = (props) => {
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
            return (
            <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }]}>
                <Image style={{ flex: 1, width: undefined, height: undefined, borderColor: '#FFFFFF', borderWidth: 1 }} source={image}/>
            </View>
            );
        });
      }
      
    return (
      gridView(props.images, width, height)
    );
}
export default GridView;