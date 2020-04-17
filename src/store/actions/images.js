import axios from 'axios';

import { BASE_URL_IMAGES } from '../../components/consts';

export const getImage = async (token, imageID) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.get(`${ BASE_URL_IMAGES }detail/${ imageID }/`);
		return data;    
	} catch (err) {
		console.log(err.message);
	}
}

export const saveImage = async (token, image) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.post(`${ BASE_URL_IMAGES }create/`, image);
		return data;    
	} catch (err) {
		console.log(err.message);
	}
}

export const editImage = async (token, image, imageID) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.put(`${ BASE_URL_IMAGES }update/${ imageID }/`, image);
		return data;    
	} catch (err) {
		console.log(err.message);
	}
}