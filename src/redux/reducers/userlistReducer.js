
import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import * as actioncreators from '../action';


// create reducer for login
export function userList(state = [], action) {
    switch (action.type) {
        case "USER_LIST":
        return action.list
            break;
        default:
            return state
    }
}