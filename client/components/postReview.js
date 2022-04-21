import axios from 'axios';
import getIp from '../ip.js';

  const postReview = async (props) => {
    const ip = getIp();    
    await axios.post(`http://${ip}:3001/api/reviews/${props.pinId}`, { description: props.userDescription, rating: props.userRating }, { headers: { 'x-auth-token': props.jwt } })
      .then((response) => {
        props.setReviews([...props.reviews, response.data]);
      })
      .catch((error) => {
        console.log(props.userDescription, props.userRating);
        console.error(error);
      })
  }

  export default postReview;