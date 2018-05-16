import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

// REDUCER FOR CLIENT LIST
export function clientList(state = [], action) {
    switch (action.type) {
        case 'CLIENT_LIST':
            console.log("================== Inside CLient List ===================");
            return action.list.map(function (item, index) {
                return {
                    name: item.name.length > 20 ? (item.name.slice(0, 20) + '...') : item.name,
                    phoneNumber: item.phoneNumber,
                    email: item.email,
                    domain: item.domain,
                    country: item.country,
                    currency: item.currency,
                    paypal_id: item.paypalId ? item.paypalId : '-',
                    status: item.status,
                    address: item.address ? item.address.length > 10 ? (item.address.slice(0, 10) + '...') : item.address : '-',
                    address1: item.address ? item.address : '-',
                    company: item.company ? item.company.length > 10 ? (item.company.slice(0, 10) + '...') : item.company : '-',
                    company1: item.company ? item.company : '-',
                    key: Math.random() * 1000000000000000000,
                    _id: item._id
                }
            })   //returning client list
            break;
        default:
            return state
    }
}
