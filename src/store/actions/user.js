import axios from 'axios';
import { USER_LIST_START, USER_LIST_SUCCESS, USER_LIST_FAIL } from './actionsTypes';
import { authStart ,authSuccess, authFail, logout, checkAuthTimeout } from './auth';

export const getCurrentUser = async (token, userId) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
		const { data } = await axios.get(`http://0.0.0.0:8000/users/user_detail/${ userId }/`);
		return data;    
	} catch (err) {
		console.log(err.message);
	}
}

export const getUserId = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	const userId = user.userId;
	
	return userId;
}

export const updateUser = (token, userObject) => {
	return dispatch => {
		dispatch(authStart());
		axios.defaults.headers = {
			'Content-Type': 'application/json',
		  	Authorization: `Token ${token}`
		};
		axios.put(`http://0.0.0.0:8000/users/update_user/${ userObject.userId }/`, 
		userObject)
		.then(res => {
			const user = {
				token: token,
				username: userObject.username,
				userId: userObject.userId,
				is_administrator: userObject.is_administrator,
				ramal: userObject.ramal,
				name: userObject.name,
				email: userObject.email,
				sector: userObject.sector,
				is_participant: !userObject.is_administrator,
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
}

export const deleteUser = (token, userId) => {
	return dispatch => {
		axios.defaults.headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`
		};
		axios.delete(`http://0.0.0.0:8000/users/delete_user/${ userId }/`)
		dispatch(logout());
	};
}

export const getUserToken = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	const token = user.token;
	
	return token;
};