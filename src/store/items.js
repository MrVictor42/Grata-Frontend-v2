import axios from 'axios';

import { BASE_URL_AGENDAS, BASE_URL_RULES } from '../consts';

export const getAgendasInMeeting = async (token, meetingID) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.get(`${ BASE_URL_AGENDAS }agendas_in_meeting/${ meetingID }/`);
		return data;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
};

export const getRulesInMeeting = async (token, meetingID) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.get(`${ BASE_URL_RULES }rules_in_meeting/${ meetingID }/`);
		return data;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
};