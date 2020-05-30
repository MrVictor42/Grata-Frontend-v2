import axios from 'axios';

import { BASE_URL_COMMENTS } from '../consts';

export const saveComment = (token, comment) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        axios.post(`${ BASE_URL_COMMENTS }create/`, comment);
		return true;    
	} catch (err) {
		return false;
	}
};

export const getComments = async(token, meetingID) => {
    axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
    };
    
    try {
        const { data } = await axios.get(`${ BASE_URL_COMMENTS }list_comments_in_meeting/${ meetingID }/`);
        return data;
    } catch (err) {
        return false;
    }
};