import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

// REDUCER FOR CLIENT LIST
export function clientList(state = [], action) {
    console.log("clientlist reducer")
    console.log(action)
    switch (action.type) {
        case 'CLIENT_LIST':
            return action.list.map(function (item, index) {
                return {
                    name: item.name.length > 20 ? (item.name.slice(0, 20) + '...') : item.name,
                    phoneNumber: item.phoneNumber,
                    email: item.email,
                    domain: item.domain,
                    country: item.country,
                    currency:item.currency,
                    paypal_id:item.paypalId,
                    status: item.status,
                    key: Math.random() * 1000000000000000000,
                    _id: item._id
                }
            })   //returning client list
            break;
        default:
            return state
    }
}
