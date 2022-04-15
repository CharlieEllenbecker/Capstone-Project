import { combineReducers } from 'redux';
import jwtReducer from './jwtReducer';
//import pinReducer from './pinReducer';
// import userReducer from './userReducer';
// import tagReducer from './tagReducer';

const reducers = combineReducers({
  jwtReducer: jwtReducer,
  //pinReducer: pinReducer,
  //   userReducer: userReducer,
  //   tagReducer: tagReducer,
});

export default reducers;
