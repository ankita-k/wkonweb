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

    case "RECEIVE_ERROR":
      return action.json

    case "RECEIVE_PWD":                   // FOR CHANGE PASSWORD
      return action.json

    case "COUNTRY_LIST":                  // FOR COUNTRY LIST
      return action.list

    case "PROJECT_LIST":                  // FOR PROJECT LIST
      return action.json

    case "CLIENT_LIST":                  // FOR COUNTRY LIST
      return action.list

    case "DELETE_PROJECT":                  // FOR COUNTRY LIST
      return action.list

    case "DELETE_CLIENT":                  // FOR CLIENT DELETE
      return action.list

    case "USER_NAME":                  // HELLO USERNAME
      return action.list

    case "TOAST":                         // FOR SHOWING NOTIFICATION
      notification[action.toastype]({
        message: action.message,
        duration: 2,
      });

    default:
      return state
  }
})

export default reducer;

