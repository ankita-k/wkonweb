import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

// REDUCER FOR  CLIENT CREATION
export function CreateModule(state = {}, action) {
 switch (action.type) {

        case 'MODULE_CREATE_SUCCESS':
            return action.response   //returning project created data
            break;
        default:
            return state
    }
}