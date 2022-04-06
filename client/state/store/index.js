import { createStore } from 'redux';
import reducers from '../reducers';

const store = () => {
    return createStore(reducers);
}

export default store;