import { createStore,applyMiddleware } from 'redux';
// import RECEIVE_POSTS from '../action'
// import selectedSubreddit from './reducer';



const reducer =((state={}, action) => {
    console.log('data dispatched');

          switch (action.type) {
            case "RECEIVE_POSTS":
              return action.json
              break;
              case "RECEIVE_ERROR":
              return action.json
              break;
              case "RECEIVE_PWD":
              return action.json
              break;
              case "COUNTRY_LIST":
              return action.list
              break;
            default:
              return state
          }
        })

export default reducer;

