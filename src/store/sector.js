import axios from 'axios';

import { BASE_URL_SECTORS } from '../consts';

export const getSectors = async (token) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.get(`${ BASE_URL_SECTORS }`);
		return data;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
};

export const getSector = async (token, slug) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.get(`${ BASE_URL_SECTORS }detail/${ slug }/`);
		return data;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
};

export const saveSector = async (token, sector) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        await axios.post(`${ BASE_URL_SECTORS }create/`, sector);
		return true;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
};

export const editSector = async (token, sector) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        await axios.put(`${ BASE_URL_SECTORS }update/${ sector.id }/`, sector);
		return true;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
};

export const deleteSector = async(token, sectorID) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
		await axios.delete(`${ BASE_URL_SECTORS }delete/${ sectorID }/`);
		return true;
	} catch {
		return false;
	}
};