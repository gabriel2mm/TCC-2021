import axios from 'axios';

export const API = function () {

    return axios.create({
        baseURL: process.env.REACT_APP_BASEURL,
        timeout: 20000,
        headers: {
            "Content-type": "application/json; charset= UTF-8",
            "Accept" : "application/json",
            "Accept-Charset": "UTF-8",
            "Access-Control-Allow-Origin": window.location.origin,
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": 86400
        }
    });
}