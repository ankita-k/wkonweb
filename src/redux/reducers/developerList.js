import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

//REDUCER FOR DEVELOPERLIST
export function developerlist(state = [], action) {
    // console.log(action)
  
    switch (action.type) {

        case 'DEVELOPER_LIST':
            return action.list
            break;

        default:
            return state
    }

}