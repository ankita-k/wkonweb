import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

// REDUCER FOR BILL CREATION
export function billList (state = {}, action) {
    console.log(action)
    switch (action.type) {
        case 'BILL_LIST':
          return {billlist:action.list}   //returning bill list
            break;
        default:
            return state
    }
}
