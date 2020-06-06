import axios from 'axios';

import { BASE_URL_CHOICES } from '../consts';

export const getChoices = async (token, questionID) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.get(`${ BASE_URL_CHOICES }list_choices/${ questionID }/`);
		return data;    
	} catch (err) {
		return false;
	}
};