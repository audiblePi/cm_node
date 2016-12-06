import { createStore, applyMiddleware, combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import reducer from './reducer.js'

const store = createStore(
	//combineReducers({ reducer, routing: routerReducer }), 
	reducer,
	applyMiddleware(thunk, promise, createLogger())
);

//export const history = syncHistoryWithStore(browserHistory, store);

export default store;