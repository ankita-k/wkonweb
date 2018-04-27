import {combineReducers} from 'redux';
import {loginReducer} from '../reducers/login';

const rootReducer=combineReducers({
    // reducers list
    loginReducer
})
export default rootReducer;