import axios from 'axios';

import { BASE_URL_USERS } from '../consts';
import { logout } from './auth';

export const getUserId = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	const userId = user.userId;
	
	return userId;
};

export const getUserToken = () => {
	let token = null;
	const user = JSON.parse(localStorage.getItem('user'));
	
	if(user !== null) {
		token = user.token;
		return token;
	} else {
		return token;
	}
};

export const authSignup = async (user) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json'
	};

	try {
		const { data } = await axios.post('http://0.0.0.0:8000/rest-auth/registration/', user);
		return data;
	} catch(err) {
		console.log(err.message);
		return false;
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
		return false;
	}
};

export const updateUser = async (token, user) => {
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
};

export const deleteUserLogout = async (token, userId) => {
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
};

export const deleteUser = async (token, userId) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
		await axios.delete(`${ BASE_URL_USERS }user_delete/${ userId }/`);
		return true;
	} catch {
		return false;
	}
};

export const getUsers = async (token) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
		const { data } = await axios.get(`${ BASE_URL_USERS }`);
		return data;
	} catch {
		return false;
	}
};

export const getUsersInSector = async (token, sectorID) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
		const { data } = await axios.get(`${ BASE_URL_USERS }users_in_sector/${ sectorID }/`);
		return data;
	} catch {
		return false;
	}
};