import axios from 'axios';

export const API = function () {

    return axios.create({
        baseURL: process.env.REACT_APP_BASEURL,
        timeout: 20000,
        headers: {
            "Content-type": "application/json; charset= UTF-8"
        }
    });
}