import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';
import moment from 'moment'
// REDUCER FOR BILL CREATION
export function billList (state = [], action) {
    console.log(action)
    switch (action.type) {
        case 'BILL_LIST':
             return action.list.map(function (item, index) {
            return {
                BDE: item.BDE ? item.BDE.length>10?(item.BDE.slice(0,10)+'....'):item.BDE: "-",
                BDE1:item.BDE ? item.BDE : "-",
                balance: item.balance ? item.balance : "-",
                billNumber: item.billNumber ? item.billNumber.length>10?(item.billNumber.slice(0,10)+'....'):item.billNumber: "-",
                billNumber1: item.billNumber ? item.billNumber : "-",
                billingDate: moment(item.billingDate).format("ll") ? moment(item.billingDate).format("ll") : "-",
                client: item.client ? item.client.name : '-',
                client1: item.client ? item.client._id : '-',
                company: item.company ? item.company.length>15?(item.company.slice(0, 15) + '...') : item.company : "-",
                company1:item.company ? item.company : "-",
                currency: item.currency ? item.currency : "-",
                email: item.email ? item.email : "-",
                paypalAccountName: item.paypalAccountName ? item.paypalAccountName.length>15?(item.paypalAccountName.slice(0, 15) + '...') : item.paypalAccountName : "-",
                paypalAccountName1:item.paypalAccountName ? item.paypalAccountName : "-",
                paypalBillNumber: item.paypalBillNumber ? item.paypalBillNumber.length>15?(item.paypalBillNumber.slice(0, 15) + '...') : item.paypalBillNumber: "-",
                paypalBillNumber1: item.paypalBillNumber ? item.paypalBillNumber : "-",
                projectCost: item.projectCost ? item.projectCost : "-",
                projectName: item.projectName.name ? item.projectName.name : "-",
                receivedAmount: item.receivedAmount ? item.receivedAmount : "-",
                receivedDate: moment(item.receivedDate).format("ll") ? moment(item.receivedDate).format("ll") : "-",
                status: item.status ? item.status : "-",
                type: item.type ? item.type : "-",
                key: Math.random() * 1000000000000000000,
                _id: item._id
            }})
            break;
        default:
            return state
    }
}
