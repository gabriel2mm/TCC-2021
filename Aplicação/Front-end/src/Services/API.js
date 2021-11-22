import axios from 'axios';

export const API = function () {

    return axios.create({
        baseURL: process.env.REACT_APP_BASEURL,
        timeout: 100000,
        headers: {
            "Content-type": "application/json; charset= UTF-8",
            "Referrer-Policy": "unsafe-url",
            "referrer": "unsafe-url"
        }
    });
}