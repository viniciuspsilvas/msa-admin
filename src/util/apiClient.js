var axios = require('axios');

var axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    timeout: 5000,
    /* other custom settings */
});

module.exports = axiosInstance;