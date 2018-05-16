import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

// REDUCER FOR  CLIENT CREATION
export function moduleCreate(state = {}, action) {
 switch (action.type) {

        case 'PROJECT_CREATE_SUCCESS':
            return action.response   //returning project created data
            break;
        default:
            return state
    }
}