import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

//LOGIN REDUCER
export function loginReducer (state = {}, action) {
    switch (action.json) {
        case 'USER_LOGIN':
            return action.json
            break;
        default:
            return state
    }
}

// export default loginReducer;