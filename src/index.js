import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConfigProvider } from 'antd';
import pt_BR from 'antd/es/locale/pt_BR';

import App from './App';
import * as serviceWorker from './serviceWorker';
import './css/index.css';

import authReducer from './store/reducers/authReducer';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	auth: authReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
	<ConfigProvider locale = { pt_BR }>
		<Provider store = { store } >
			<App />
		</Provider>
	</ConfigProvider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();