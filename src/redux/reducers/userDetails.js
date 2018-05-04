import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

//LOGIN REDUCER FOR LOGGED USER DETAILS
export function loggeduserDetails (state = {}, action) {
  
    switch (action.type) {
       
        case 'LOGGED_USER_DETAILS':
          return action.detail   //returning user info 
            break;
            case 'CLEAR_USER_DATA':
            return {}
        default:
            return state
    }
}
