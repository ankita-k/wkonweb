import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';


//LOGIN REDUCER FOR LOADER
export function fullloader(state = false, action) {
   switch (action.type) {
    case 'FULL_PAGE_LOADER':

      return action.data   //hide loader
      break;
    default:
      return state
  }
}
