import { combineReducers } from 'redux';
import { loginReducer } from '../reducers/login';
import { toasts } from '../reducers/toast';
import { projectList } from '../reducers/projectlist';
import { billCreate } from '../reducers/billcreate';

// reducers list
const rootReducer = combineReducers({
    loginReducer,                    //for user login
    toasts,                          // to show toast
    projectList,                     // to get projectlist
    billCreate,                      // create bill
})


export default rootReducer;