import axios from 'axios';

import { BASE_URL_QUESTTIONAIRE } from '../consts';

export const getQuesttionaire = async (token, questtionaireID) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.get(`${ BASE_URL_QUESTTIONAIRE }detail/${ questtionaireID }/`);
		return data;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
};