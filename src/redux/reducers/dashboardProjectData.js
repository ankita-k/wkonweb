import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

//LOGIN REDUCER FOR DASHBOARD DATA 
export function dashboardProjectData(state = {}, action) {

    switch (action.type) {

        case 'DASHBOARD_PROJECT':
            return  action.data   //returning dashboard number for project
            break;
      
        default:
            return state
    }
}

