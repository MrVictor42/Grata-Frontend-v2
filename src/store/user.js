import axios from 'axios';

import { BASE_URL_USERS } from '../components/consts';
import { logout } from './auth';

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

export const authSignup = async (user) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json'
	};

	try {
		const { data } = await axios.post('http://0.0.0.0:8000/rest-auth/registration/', user);
		return data;
	} catch(err) {
		console.log(err.message);
	}
};

export const getCurrentUser = async (token, userId) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
		const { data } = await axios.get(`${ BASE_URL_USERS }user_detail/${ userId }/`);
		return data;    
	} catch(err) {
		console.log(err.message);
	}
}

export const updateUser = async(token, user) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
		await axios.put(`${ BASE_URL_USERS }user_edit/${ user.id }/`, user);
		return true;
	} catch(err) {
		return false;
	}
}

export const deleteUser = async(token, userId) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
		await axios.delete(`${ BASE_URL_USERS }user_delete/${ userId }/`);
		logout();
		return true;
	} catch {
		return false;
	}
}