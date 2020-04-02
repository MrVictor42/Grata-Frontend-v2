import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';

import 'antd/dist/antd.css';
import './css/App.css';

import { authCheckState } from './store/actions/auth';
import Layout from './components/layout/Layout';

class App extends Component {

	componentDidMount() {
		this.props.onTryAutoSignup();
  	}

	render() {
		return (
			<Router>
				<Layout {...this.props}>
					<BaseRouter />
				</Layout>
			</Router>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
	  	onTryAutoSignup: () => dispatch(authCheckState())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);