import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

// REDUCER FOR BILL CREATION
export function billCreate (state = {}, action) {
 
    switch (action.type) {
        case 'BILL_CREATE_SUCCESS':
          return {createdbill:action.response}   //returning bill created data
            break;
        default:
            return state
    }
}

