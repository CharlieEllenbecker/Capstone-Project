import { combineReducers } from 'redux';
import jwtReducer from './jwtReducer';
import pinReducer from './pinReducer';

const reducers = combineReducers({
    jwtReducer: jwtReducer,
    pinReducer: pinReducer
});

export default reducers;