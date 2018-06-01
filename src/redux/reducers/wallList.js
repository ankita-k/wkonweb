import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

//REDUCER FOR WALL LIST
export function projectWallList(state = [], action) {
    switch (action.type) {

       case 'PROJECT_WALL_LIST':
           return action.list
           break;

       default:
           return state
   }

}