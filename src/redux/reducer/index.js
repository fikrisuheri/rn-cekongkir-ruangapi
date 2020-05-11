import Provinces from './provinces';
import Home from './home';
import {combineReducers} from 'redux';

const rootReducers = combineReducers({
    listProvinces : Provinces,
    listHome : Home
})

export default rootReducers;