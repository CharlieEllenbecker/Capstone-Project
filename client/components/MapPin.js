import MapView from 'react-native-maps';
import { Animated as OldAnimated } from 'react-native';
import { styles } from '../components/styles';

const MapPin = ({ pin, scaleStyle, onMarkerPress }) => {

    return(
        <MapView.Marker
            coordinate={{ latitude: pin.coordinate.latitude, longitude: pin.coordinate.longitude }}
            onPress={(e) => onMarkerPress(e)}
        >
            <OldAnimated.View style={[styles.markerWrap]}>
                <OldAnimated.Image
                source={require('../assets/map_marker.png')}
                style={[styles.marker, scaleStyle]}
                resizeMode="cover"
                />
            </OldAnimated.View>
        </MapView.Marker>
    );
}

export default MapPin;