import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';
import { notification } from "antd";

// REDUCER FOR SHOWING TOAST
export function toasts(state ={}, action) {
    switch (action.type) {
       
        case 'TOAST':
        notification[action.toastype]({
            message: action.message,
            duration: 1.5,
          });
          return state
          break;
        default:
            return state
    }
}

