var axios = require('axios');

let url = null
if (process.env.NODE_ENV === 'development') {
    url = 'http://phpstack-209922-714883.cloudwaysapps.com'
}

if (process.env.NODE_ENV === 'production') {
    url = process.env.REACT_APP_SERVER_URL;
}

var axiosInstance = axios.create({
    baseURL: url,
    timeout: 3000,
    /* other custom settings */
});

module.exports = axiosInstance;