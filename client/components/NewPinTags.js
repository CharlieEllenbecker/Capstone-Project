import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tag } from '../components/Tag';


const NewPinTags = () => {
    const [defaultBackgroundColor, setDefaultBackgroundColor] = useState('#fff'); // Default white
    const { tags } = useSelector((state) => state.tagReducer);



    return(
        <>
            {tags.map((tag, index) => (
                <Tag key={index} tag={tag} backgroundColor={defaultBackgroundColor} setAllTagsBackgroundColor={setDefaultBackgroundColor} />
            ))}
        </>
    );
}

export default NewPinTags;