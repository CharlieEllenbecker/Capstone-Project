import jwtTypeActions from '../actions/types/jwtTypeActions';

const initialState = {
  jwt: null
};

const jwtReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case jwtTypeActions.SET_JWT:
      return {
        ...state,
        jwt: payload
      };
    case jwtTypeActions.DELETE_JWT:
      return {
        ...state,
        jwt: null
      };
    default:
      return state;
  }
};

export default jwtReducer;
