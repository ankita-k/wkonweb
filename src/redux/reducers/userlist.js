import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

//REDUCER FOR USERLIST
export function userList(state = [], action) {
     switch (action.type) {

        case 'USER_LIST':
            return action.list
            break;

        default:
            return state
    }

}