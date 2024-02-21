import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_HOST as string;

const instance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    function (config) {
        if (localStorage.getItem('access-token')) {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('access-token')}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem('access-token');
        }
        return Promise.reject(error);
    }
);

export default instance;
