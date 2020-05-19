import axios from 'axios';

import { BASE_URL_MEETING } from '../consts';

export const getAllMeetings = async (token) => {
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

export const getMeetings = async (token, slugProject) => {
    axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.get(`${ BASE_URL_MEETING }meetings_in_project/${ slugProject }/`);
		return data;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
};

export const getMeeting = async (token, meetingID) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.get(`${ BASE_URL_MEETING }detail/${ meetingID }/`);
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

export const editMeeting = async (token, meeting) => {
    axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        await axios.put(`${ BASE_URL_MEETING }update/${ meeting.meetingID }/`, meeting);
		return true;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
}

export const addUsersMeeting = async (token, meeting) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};
	
	try {
		await axios.put(`${ BASE_URL_MEETING }add_users_meeting/${ meeting.meetingID }/`, meeting);
		return true;
	} catch {
		return false;
	}
};

export const removeUsersMeeting = async (token, meeting) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};
	
	try {
		await axios.put(`${ BASE_URL_MEETING }remove_users_meeting/${ meeting.meetingID }/`, meeting);
		return true;
	} catch {
		return false;
	}
};