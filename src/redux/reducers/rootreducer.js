import { combineReducers } from 'redux';
import { loginReducer } from '../reducers/login';
import { toasts } from '../reducers/toast';
import { projectList } from '../reducers/projectlist';
import { billCreate } from '../reducers/billcreate';
import { billList } from '../reducers/billList';
import { clientList } from '../reducers/clientList';
import {userList} from  '../reducers/userlist';
import {developerlist} from '../reducers/developerList'
import {loggeduserDetails} from '../reducers/userDetails';
import {dashboardProjectData} from '../reducers/dashboardProjectData';
import {dashboardCustomerData} from '../reducers/dashboardCustomerData';
import {clientCreate} from '../reducers/clientcreate';
import {countrylists} from '../reducers/countrylist';
import {fullloader} from '../reducers/loader';
import {listByTags} from '../reducers/listByTags';
// reducers list
const rootReducer = combineReducers({
    loginReducer,                    //for user login
    toasts,                          // to show toast
    projectList,                     // to get projectlist
    billCreate,                       // create bill
    billList,                         // getting all billlist
    clientList,                      // get client list
    userList,                        // get userlist
    developerlist,                   // get develper list
    loggeduserDetails,               // logged in user detail
    dashboardProjectData,                    // dashboard numbers for customer,project 
    dashboardCustomerData,     
    clientCreate ,                   //create client
    countrylists,                    // get countrylist
    fullloader,
    listByTags
})


export default rootReducer;