import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunk from "redux-thunk";
import {Provider} from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import reducers from '../src/redux/reducer';

let   store=createStore(reducers,applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
