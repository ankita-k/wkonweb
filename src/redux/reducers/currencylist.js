import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';


export function currencylist (state = {}, action) {
  
    switch (action.type) {
       
        case 'CURRENCY_LIST':
          return action.list  //returning user info 
            break;
        default:
            return state
    }
}

