import React from 'react';
import ReactDOM from 'react-dom';
import ListPosts from './Containers/ListPosts';
import LogIn from './Containers/LogIn';
import CreateAccount from './Containers/CreateAccount';
import Documents from './Containers/Documents';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers/index';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<Switch>
				<Route path="/LogIn" component={LogIn} />
				<Route path="/CreateAccount" component={CreateAccount} />
				<Route path="/Documents" component={Documents} />
				<Route path="/" component={ListPosts} />
			</Switch>
		</BrowserRouter>
	</Provider>
	, document.getElementById('root'));

registerServiceWorker();
