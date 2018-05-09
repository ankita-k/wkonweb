import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';


// REDUCER FOR MEMBER
export function ProjectMember (state=[], action) {
    switch (action.type) {
        case 'MEMBER_REMOVE':
          return action.list   //returning bill created data
            break;
        default:
            return state
    }
}