import { useState } from 'react';
import { styles } from '../components/styles';

import { Text, TouchableOpacity } from 'react-native';

const Tag = ({ tag, backgroundColor, setAllTagsBackgroundColor, setSelectedTag }) => { // TODO: callback function
    const [isSelected, setIsSelected] = useState(false);
    const [individualBackgroundColor, setIndividualBackgroundColor] = useState(backgroundColor);
    
    const changeColor = () => {
        setIsSelected(!isSelected);
        if(isSelected) {
            setAllTagsBackgroundColor('#fff');
        } else {
            setIndividualBackgroundColor('#d3d3d3');    // TODO: this isn't going to work because the individual background is not going to keep looking at the prop background color... must always look at it instead? and maybe add a teruny operator? also just pass in the selected and unselected color choices instead of having it embedded
        }
        
    }

    return(
        <TouchableOpacity 
        key={index} 
        style={[styles.chipsItemHeader, {borderColor: '#000000', borderWidth: 0.7, height: 30, backgroundColor: individualBackgroundColor}]}
        onPress={() => changeColor()}
        >
            <Text>{tag}</Text>
        </TouchableOpacity>
    );
}

export default Tag;