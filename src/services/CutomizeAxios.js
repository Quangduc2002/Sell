import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:8080',
});

instance.defaults.withCredentials = false;

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.jwt}`;
// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },

    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const status = (error && error.response && error.response.status) || 500;
        switch (status) {
            case 401: {
                return error && error.response.data;
            }

            case 403: {
                return error && error.response.data;
            }

            case 400: {
                return Promise.reject(error);
            }

            case 404: {
                return Promise.reject(error);
            }

            case 409: {
                return Promise.reject(error);
            }

            case 422: {
                return Promise.reject(error);
            }

            default: {
                return Promise.reject(error);
            }
        }
    },
);

export default instance;
