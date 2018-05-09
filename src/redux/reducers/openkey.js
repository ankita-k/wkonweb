import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';


// REDUCER FOR OPENING MENU ITEM SELECTED KEY
export function openKey(state = [], action) {
    switch (action.type) {
        case 'OPEN_SELECTED_MENU_KEY':
        if(action.data){
            let arr = [];
            arr.push(action.data)
            return arr
        }  
        else{
            return []
        }
       
            // change key of menu item
            break;
        default:
            return state
    }
}
