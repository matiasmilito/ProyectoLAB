const axios = require('axios');

const baseUrl = 'http://localhost:3000/';

export const httpGet = async (endpoint) => {
  return axios.get(baseUrl + endpoint, {
      headers: {
          authorization: localStorage.getItem('token')
      }
  })
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