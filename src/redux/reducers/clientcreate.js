import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

// REDUCER FOR  CLIENT CREATION
export function clientCreate(state = {}, action) {
 switch (action.type) {

        case 'CLIENT_CREATE_SUCCESS':
            return action.response   //returning client created data
            break;
        default:
            return state
    }
}

