import { combineReducers } from 'redux';
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
import {countrylists} from '../reducers/countrylist';
import {fullloader} from '../reducers/loader';
import {listByTags} from '../reducers/listByTags';
import {menuselectedkey} from '../reducers/menukey';
import {openKey} from '../reducers/openkey';
import {ProjectMember} from '../reducers/member';
import {CreateModule} from '../reducers/createModule';
import { projectWallList } from '../reducers/wallList';


// reducers list
const rootReducer = combineReducers({
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
    countrylists,                    // get countrylist
    fullloader,
    listByTags,
    menuselectedkey,
    openKey,
    ProjectMember,
    CreateModule,
    projectWallList
    // moduleList                          //get module list against project
})


export default rootReducer;