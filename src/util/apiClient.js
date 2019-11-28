var axios = require('axios');

var axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    timeout: 15000,
    /* other custom settings */
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const authToken = localStorage.getItem('authToken');
    if (authToken)
        config.headers.Authorization = `Bearer ${authToken}`;

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

module.exports = axiosInstance;