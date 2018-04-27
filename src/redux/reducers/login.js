import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

//LOGIN REDUCER
export function loginReducer (state = {}, action) {
  
    switch (action.type) {
       
        case 'USER_LOGIN_SUCCESS':
          return {userInfo:action.json.result}
            break;
        default:
            return state
    }
}

