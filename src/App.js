import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import 'antd/dist/antd.css';
import './css/App.css';
import { apiKey, authDomain } from './env';

import Layout from './components/layout/Layout';

firebase.initializeApp({
	apiKey: apiKey,
	authDomain: authDomain
});

class App extends Component {

	state = { isSignedIn : false }
	uiConfig = {
		signInFlow: "popup",
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		callbacks: {
		  	signInSuccess: () => false
		}
	}

	componentDidMount = () => {
		firebase.auth().onAuthStateChanged(user => {
			this.setState({ isSignedIn: !!user })
		});
	}

	render() {
		return (
			<div className = 'App'>
				{ this.state.isSignedIn ? ( 
					<span>
						<div> Signed In! </div>
						<button onClick = { ()=> firebase.auth().signOut() }> Signout </button>
						<h1>Welcome {firebase.auth().currentUser.displayName}</h1>
						<h1>Welcome {firebase.auth().currentUser.email}</h1>
						<img
						alt="profile picture"
						src={firebase.auth().currentUser.photoURL}
						/>
					</span>
				) : (
					<StyledFirebaseAuth
						uiConfig = { this.uiConfig }
						firebaseAuth = { firebase.auth() }
					/>
				)}
			</div>
			// <Router>
			// 	<Layout {...this.props}>
			// 		<BaseRouter />
			// 	</Layout>
			// </Router>
		);
	}
}

export default App;