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
    case "TOAST":                         // FOR SHOWING NOTIFICATION
      notification[action.toastype]({
        message: action.message,
        duration: 2,
      });
      break;
    default:
      return state
  }
})

export default reducer;

