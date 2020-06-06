import axios from 'axios';

import { BASE_URL_GRADEDQUESTTIONAIRE } from '../consts';

export const saveGradedQuesttionaire = (token, gradedQuesttionaire) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        axios.post(`${ BASE_URL_GRADEDQUESTTIONAIRE }create/`, gradedQuesttionaire);
		return true;    
	} catch (err) {
		return false;
	}
};