import { combineReducers } from 'redux';
import jwtReducer from './jwtReducer';
import pinReducer from './pinReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
    jwtReducer: jwtReducer,
    pinReducer: pinReducer,
    userReducer: userReducer
});

export default reducers;