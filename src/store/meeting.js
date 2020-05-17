import axios from 'axios';

import { BASE_URL_MEETING } from '../consts';

export const getMeetings = async (token) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.get(`${ BASE_URL_MEETING }`);
		return data;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
};

export const saveMeeting = async (token, meeting) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        await axios.post(`${ BASE_URL_MEETING }create/`, meeting);
		return true;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
};