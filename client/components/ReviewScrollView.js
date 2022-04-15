import { View, Text, ScrollView } from 'react-native';
import StarRating from './StarRating';

const ReviewScrollView = (props) => {
    return (
        <View style={{ height: 160, marginTop:5, marginBottom: 5}}>
            <ScrollView
              horizontal={true}
            >
            {/*reviews.map((review) => {*/}
                <View style={{ height: 160, width: 200, marginLeft: 20, borderWidth: 0.7, borderRadius: 5, borderColor: '#dddddd' }}>
                    <View style={{flex: 1, paddingLeft: 15, paddingTop: 15 }}>
                        <Text style={{ paddingLeft: 5 }}>{props.userId}</Text>
                        <StarRating size={15} rating={props.rating} style={{ paddingLeft: 5 }}/>
                        <Text style={{ paddingLeft: 5 }}>{props.description}</Text>
                    </View>
                </View>
            {/*});*/}
            </ScrollView>
        </View>
    );
}
export default ReviewScrollView;