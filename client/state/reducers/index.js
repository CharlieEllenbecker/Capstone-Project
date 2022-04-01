import { combineReducers } from 'redux';
import jwtReducer from './jwtReducer';

const reducers = combineReducers({
    jwtReducer: jwtReducer
});

export default reducers;