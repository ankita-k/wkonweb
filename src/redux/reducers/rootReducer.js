import { combineReducers } from 'redux';
import { userList } from './userlistReducer';


const rootReducer = combineReducers({
    // short hand property names
// imported reducer names
userList
})

export default rootReducer;  