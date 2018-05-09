import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

//REDUCER FOR COUNTRYLIST
export function countrylists(state = [], action) {
   switch (action.type) {

        case 'COUNTRY_LIST':
            return action.list
            break;

        default:
            return state
    }

}