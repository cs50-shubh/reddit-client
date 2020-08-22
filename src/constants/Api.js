import axios from "axios";
import { ACCESS_TOKEN, USER_DATA } from "../constants/storage";

const Api = axios.create({
    baseURL: 'https://campaigns-server.herokuapp.com',
    headers: {
        Authorization: {
            toString() {
                return localStorage.getItem(ACCESS_TOKEN) || undefined
            }
        }
    }
});

// Globar error Interceptor - Takes message from response to error.message
Api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(USER_DATA);
        window.dispatchEvent(new Event("user_loggedout"));
    }
    const message = error.response && error.response.data
        ? error.response.data.message
        : error.message;
    error.message = message
    return Promise.reject(error);
});

export default Api;

export const baseURL = 'http://3.80.162.41:8080'
