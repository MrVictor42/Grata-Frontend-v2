import axios from 'axios';
import { BASE_URL_USERS } from './actionsTypes';
import { authStart ,authSuccess, authFail, logout, checkAuthTimeout } from './auth';

export const getUserId = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	const userId = user.userId;
	
	return userId;
}

export const getUserToken = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	const token = user.token;
	
	return token;
}

export const getCurrentUser = async (token, userId) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
		const { data } = await axios.get(`${ BASE_URL_USERS }user_detail/${ userId }/`);
		return data;    
	} catch (err) {
		console.log(err.message);
	}
}

export const updateUser = (token, user) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${token}`
	};

	axios.put(`${ BASE_URL_USERS }user_edit/${ user.id }/`, user).
	then(res => {
		console.log(res)
	}).catch(err => {
		console.log(err)
	});
}

// export const deleteUser = (token, userId) => {
// 	return dispatch => {
// 		axios.defaults.headers = {
// 			'Content-Type': 'application/json',
// 			Authorization: `Token ${token}`
// 		};
// 		axios.delete(`http://0.0.0.0:8000/users/delete_user/${ userId }/`)
// 		dispatch(logout());
// 	};
// }