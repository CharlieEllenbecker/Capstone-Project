import jwtTypeActions from '../actions/types/jwtTypeActions';

const initialState = {
  jwt: '',
};

const jwtReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case jwtTypeActions.SET_JWT:
      return {
        ...state,
        jwt: payload,
      };
    case jwtTypeActions.DELETE_JWT:
      return {
        ...state,
        jwt: '',
      };
    default:
      return state;
  }
};

export default jwtReducer;
