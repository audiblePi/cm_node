import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory, browserHistory } from "react-router";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { Provider } from 'react-redux'
import store from "./store/store.js"

import Layout from "./pages/Layout";

import List from "./pages/List";
import Edit from "./pages/Edit";

const app = document.getElementById('app');

ReactDOM.render(
	<Provider store={ store }>
		<MuiThemeProvider>
		  <Router history={browserHistory}>
		    <Route path="/" component={Layout}>
		      <IndexRoute component={List}></IndexRoute>
		      <Route path="edit(/:id)" name="edit" component={Edit}></Route>
		    </Route>
		  </Router>
		</MuiThemeProvider>
	</Provider>,
app);
