import { createStore, applyMiddleware } from 'redux';




const reducer = ((state = {}, action) => {
  console.log('data dispatched');

  switch (action.type) {
    case "RECEIVE_POSTSAPI":
      return action.json
      break;
    case "COUNTRY_LIST":
      return action.list
      break;
    default:
      return state
  }
})
// console.log(store)
// console.log(store.getState())
export default reducer;

