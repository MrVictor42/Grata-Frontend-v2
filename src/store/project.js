import axios from 'axios';

import { BASE_URL_PROJECTS } from '../consts';

export const getProjects = async (token, sectorID) => {
    axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.get(`${ BASE_URL_PROJECTS }projects_in_sector/${ sectorID }/`);
		return data;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
};

export const getProject = async (token, projectID) => {
    axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        const { data } = await axios.get(`${ BASE_URL_PROJECTS }detail/${ projectID }/`);
		return data;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
};

export const saveProject = async (token, project) => {
    axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        await axios.post(`${ BASE_URL_PROJECTS }create/`, project);
		return true;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
};

export const editProject = async (token, project) => {
    axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
        await axios.put(`${ BASE_URL_PROJECTS }update/${ project.projectID }/`, project);
		return true;    
	} catch (err) {
		console.log(err.message);
		return false;
	}
}

export const deleteProject = async (token, projectID) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};

	try {
		await axios.delete(`${ BASE_URL_PROJECTS }delete/${ projectID }/`);
		return true;
	} catch {
		return false;
	}
};

export const addUsersProject = async (token, project) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};
	
	try {
		await axios.put(`${ BASE_URL_PROJECTS }add_users_project/${ project.projectID }/`, project);
		return true;
	} catch {
		return false;
	}
};

export const removeUsersProject = async (token, project) => {
	axios.defaults.headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${ token }`
	};
	
	try {
		await axios.put(`${ BASE_URL_PROJECTS }remove_users_project/${ project.projectID }/`, project);
		return true;
	} catch {
		return false;
	}
};