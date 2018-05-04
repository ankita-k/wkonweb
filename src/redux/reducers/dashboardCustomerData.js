import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

//LOGIN REDUCER FOR DASHBOARD DATA 
export function dashboardCustomerData(state = {}, action) {

    switch (action.type) {

        case 'DASHBOARD_CUSTOMER':
            return  action.data   //returning dashboard number for customer
            break;
      
        default:
            return state
    }
}

