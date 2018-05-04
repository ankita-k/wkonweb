import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

// REDUCER FOR GETTING LIST ACCORDING TO TAGS ASSIGNED
export function listByTags(state = [], action) {
    switch (action.type) {
        case 'VERTICAL_LEAD':
            return action.list
          break;
        default:
            return state
    }
}
