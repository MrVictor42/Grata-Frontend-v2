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

export const getUserInGraded = async (token, userID) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.get(`${ BASE_URL_GRADEDQUESTTIONAIRE }user_in_graded/${ userID }/`);
		return data;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
};

export const getGradedInQuesttionaire = async (token, questtionaireID) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.get(`${ BASE_URL_GRADEDQUESTTIONAIRE }graded_questtionaire/${ questtionaireID }/`);
		return data;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
};