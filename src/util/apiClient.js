var axios = require('axios');

var axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    timeout: 3000,
    /* other custom settings */
});

module.exports = axiosInstance;