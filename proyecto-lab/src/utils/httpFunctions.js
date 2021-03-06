const axios = require('axios');

const baseUrl = ' http://127.0.0.1:8000/';

export const httpGet = async (endpoint) => {
    return axios.get(baseUrl + endpoint, {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
}

export const httpGet2 = async (endpoint) => {
    return axios.get(baseUrl + endpoint,
    )
}


export const httpPost = async (endpoint, data) => {
    return axios.post(baseUrl + endpoint, data, {
        headers: {
            authorization: localStorage.getItem('token')
        }
    })
}

export const httpPost2 = async (endpoint, data) => {
    return axios.post(baseUrl + endpoint, data,
    )
}