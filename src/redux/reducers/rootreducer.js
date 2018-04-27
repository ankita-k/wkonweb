import { combineReducers } from 'redux';
import { loginReducer } from '../reducers/login';
import { toasts } from '../reducers/toast';


const rootReducer = combineReducers({
    // reducers list
    loginReducer,    //for user login
    toasts  // to show toast
})
export default rootReducer;