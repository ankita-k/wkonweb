import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

//LOGIN REDUCER FOR PROJECTLIST
export function projectList (state = {}, action) {
  
    switch (action.type) {
       
        case 'PROJECT_LIST':
          return {projectlist:action.json.result}   // returning project list array
            break;
        default:
            return state
    }
}

