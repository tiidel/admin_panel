import axios from "axios";
import { Cookie } from "lucide-react";

function getCookieValue(key) {
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
        const [cookieKey, cookieValue] = cookie.trim().split('=');
        
        if (cookieKey === key) {
            let json =  decodeURIComponent(cookieValue);
            return JSON.parse(json);
        }
    }
    
    return null;
}

var user = getCookieValue('user');

const token = user?.access ? user.access : ""

const configToken = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}

const config = {
    headers: {
        "Content-Type": "application/json",
    }
}

const configGlobal = token ? configToken : config

const BASEURL = 'http://localhost:8000/api/v1'


export const getRequest = async(endpoint) => {
    
    try {
        const response = await axios.get(`${BASEURL}${endpoint}`, configGlobal)
        return response
    } catch (err) {
        return err
    }
}
export const getExternalRequest = async(endpoint) => {
    try {
        const response = await axios.get(endpoint)
        return response
    } catch (err) {
        return err
    }
}

export const getRequestWithParams = async(endpoint, params) => {
    try {
        const response = await axios.get(`${BASEURL}${endpoint}`, params, configGlobal)
        return response
    } catch (error) {
        return error
    }
}

export const postRequest = async(endpoint, data) => {
    try {
        const response = await axios.post(`${BASEURL}${endpoint}`, data, configGlobal);
        return response
    } catch (error) {
        // console.error(error);
        return error
    }
}



/**
 * @param {string} endpoint to which the request is being made to with the id, uuid for a user
 * @param {Object} payload Data you want to update with  
 * @returns {Object}
 */
export const patchRequest = async (endpoint, data) => {
    try {
        const response = await axios.patch(`${BASEURL}${endpoint}`, data, configGlobal);
        return response;
    } catch (error) {
        console.error("Error during patch request:", error);
        return error;
    }
};

export const simplePatchRequest = async(endpoint, data) => {
    try {
        const response = await axios.patch(`${endpoint}`, data, configGlobal);
        return response
    } catch (error) {
        console.error(error);
        return error
    }
}

/**
 * @param {string} endpoint to which the request is being made to with the id, uuid for a user
 * @returns {Boolean}
 */
export const deleteRequest = async(endpoint) => {
    try {
        const response = await axios.delete(`${BASEURL}${endpoint}`, configGlobal);
        return response
    } catch (error) {
        console.error(error);
        return error
    }
}

export const  auth = async (endpoint, data) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const response = await axios.post(`${BASEURL}${endpoint}`, data, config);
        return response
    } catch (error) {
        console.error(error);
        return(error)
    }
}


export const postFetchRequest = async (endpoint, requestData) => {
	const response = await fetch(endpoint, {
		method: 'POST',
		body: requestData,
		dataType: "jsonp",
		headers: {
			'Authorization': token ? `Bearer ${token}` : '',
		}
	})
	const data = response.json()
	return data;
}