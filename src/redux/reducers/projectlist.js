import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';
import moment from 'moment';

//LOGIN REDUCER FOR PROJECTLIST
export function projectList (state = [], action) {
  
    switch (action.type) {
       
        case 'PROJECT_LIST':
          return action.list.map(function (item, index) {
            return {
                name: item.name.length > 20 ? (item.name.slice(0, 20) + '...') : item.name,
                name1: item.name,
                requirement: item.requirement.length > 15 ? (item.requirement.slice(0, 15) + '...') : item.requirement,
                requirement1: item.requirement,
                status: item.status,
                technology: (item.technology.replace(/"/g, '')).split(',').length > 1 ? ((item.technology.replace(/"/g, '')).split(',')[0] + '..') : (item.technology.replace(/"/g, '')).split(','),
                technology1: (item.technology.replace(/"/g, '')).split(','),
                expectedStartDate: item.expectedStartDate ? moment(item.expectedStartDate).format("ll") : '',
                expectedEndDate: item.expectedEndDate ? moment(item.expectedEndDate).format("ll") : '',
                actualStartDate: item.actualStartDate ? moment(item.actualStartDate).format("ll") : '',
                actualEndDate: item.actualEndDate ? moment(item.actualEndDate).format("ll") : '',
                key: Math.random() * 1000000000000000000,
                _id: item._id,
                client: item.client
            }})
                   // returning project list array
            break;
        default:
            return state
    }
}

