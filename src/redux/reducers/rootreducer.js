import { combineReducers } from 'redux';
import { loginReducer } from '../reducers/login';
import { toasts } from '../reducers/toast';
import { projectList } from '../reducers/projectlist';
import { billCreate } from '../reducers/billcreate';
import { billList } from '../reducers/billList';
import {clientList} from '../reducers/clientList';
import {clientCreate} from '../reducers/clientcreate';

// reducers list
const rootReducer = combineReducers({
    loginReducer,                    //for user login
    toasts,                          // to show toast
    projectList,                     // to get projectlist
    billCreate,                       // create bill
    billList,                         // getting all billlist
    clientList,                      // get client list,
    clientCreate ,                    //create client

})


export default rootReducer;