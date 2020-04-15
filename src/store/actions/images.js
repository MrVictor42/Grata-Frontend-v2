import axios from 'axios';

import { BASE_URL_IMAGES } from './actionsTypes';

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