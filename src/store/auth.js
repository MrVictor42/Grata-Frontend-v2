import axios from 'axios';

import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from '../consts';

export const authStart = () => {
	return {
    	type: AUTH_START
  	};
};

export const authSuccess = user => {
	return {
    	type: AUTH_SUCCESS,
    	user
  	};
};

export const authFail = error => {
	return {
		type: AUTH_FAIL,
    	error: error
  	};
};

export const logout = () => {
	localStorage.removeItem('user');
	return {
		type: AUTH_LOGOUT
	};
};

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const authCheckState = () => {
	return dispatch => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user === undefined || user === null) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(user.expirationDate);
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				dispatch(authSuccess(user));
				dispatch(
					checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
				);
			}
		}
  	};
};

export const authLogin = (username, password) => {
	return dispatch => {
		dispatch(authStart());
		axios.post('https://api-grata.herokuapp.com/rest-auth/login/', {
			username: username,
			password: password
		})
		.then(res => {
			const user = {
				token: res.data.key,
				username,
				userId: res.data.user,
				is_administrator: res.data.user_type.is_administrator,
				is_participant: res.data.user_type.is_participant,
				ramal: res.data.ramal,
				name: res.data.name,
				expirationDate: new Date(new Date().getTime() + 3600 * 1000)
			};
			localStorage.setItem('user', JSON.stringify(user));
			dispatch(authSuccess(user));
			dispatch(checkAuthTimeout(3600));
		})
		.catch(err => {
			dispatch(authFail(err));
		});
	};
};