import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import { notification } from "antd";
// import RECEIVE_POSTS from '../action'
// import selectedSubreddit from './reducer';



const reducer = ((state = {}, action) => {
  console.log('data dispatched', action);

  switch (action.type) {
    case "RECEIVE_POSTS":                 // FOR API POST REQUEST
      return action.json
      break;
    case "RECEIVE_ERROR":
      return action.json
      break;
    case "RECEIVE_PWD":                   // FOR CHANGE PASSWORD
      return action.json
      break;
    case "COUNTRY_LIST":                  // FOR COUNTRY LIST
      return action.list
      break;
    case "PROJECT_LIST":                  // FOR PROJECT LIST
      return action.json
      break
    case "CLIENT_LIST":                  // FOR CLIENT LIST
      return action.list
      break;
    case "DELETE_PROJECT":                  // FOR DELETE PROJECT LIST
      return action.list
      break;

    case "EDIT_PROJECT":                  // FOR EDIT PROJECT LIST
      return action.list
      break;

    case "USER_NAME":                  // HELLO USERNAME
      return action.list
      break;
    case "USER_CREATE":                  // NEW USER CREATE
      return action.json
      break;
    case "DELETE_CLIENT":                  // FOR CLIENT DELETE
      return action.list
      break;
      case "DELETE_USER":                  // FOR CLIENT DELETE
      return action.list
      break;
    case "TOAST":                         // FOR SHOWING NOTIFICATION
      notification[action.toastype]({
        message: action.message,
        duration: 2,
      });
      break;
    case "UPDATE_CLIENT":                  // FOR CLIENT DELETE
      return action.list
      break;
    case "USER_LIST":                  // FOR USER LIST
      return action.list
      break;
    default:
      return state
  }
})

export default reducer;

