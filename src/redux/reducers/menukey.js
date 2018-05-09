import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';


// REDUCER FOR CHANGING MENU ITEM SELECTED KEY
export function menuselectedkey(state = [], action) {
    switch (action.type) {
        case 'MENU_SELECTED_KEY':
            let arr = [];
            arr.push(action.data)
            return arr
            // change key of menu item
            break;
        default:
            return state
    }
}
