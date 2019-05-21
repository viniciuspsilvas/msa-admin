const BACKEND_URL= process.env.REACT_APP_SERVER_URL;
 
var backend = {
	students: BACKEND_URL + '/api/Students',
	studentGroups: BACKEND_URL + '/api/StudentGroups',

	messages: BACKEND_URL + '/api/Messages',
	sendMessageBatch: BACKEND_URL + '/api/Messages/sendMessageBatch',
	studentAdvices: BACKEND_URL + '/api/StudentAdvices',
	
	login: BACKEND_URL + '/api/Users/login',
}

var config = {
	backend_url: BACKEND_URL,
	backend: backend
}

module.exports = config;