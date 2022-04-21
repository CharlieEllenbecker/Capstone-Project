import React, { useState } from 'react';
import {
    View, TouchableOpacity
} from 'react-native';
import {
    HorizontalContainer,
    HorizontalContainerTwo
} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
const InputStarRating = (props) => {
    const [defaultRating, setDefaultRating] = useState(0);
    const [maxRating, setMaxRating] = useState([1,2,3,4,5]);

    return (
        <HorizontalContainer>
            {
                maxRating.map((star, index) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            index={star}
                            onPress={() => [setDefaultRating(star), props.setUserRating(star)]}
                        >
                        <Ionicons  
                            name = {
                            star <= defaultRating 
                            ? "ios-star" 
                            : "ios-star-outline"
                            }
                            size={25}
                            color='#FF8C00'
                        />
                        </TouchableOpacity>
                )
                })
            }
        </HorizontalContainer>
        
    );
}

export default InputStarRating;