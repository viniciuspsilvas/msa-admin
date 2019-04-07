const BACKEND_PORT= "3000";
//const BACKEND_URL= "http://192.168.1.164";
const BACKEND_URL= "http://10.0.0.6";


const FULL_BACKEND_URL = BACKEND_URL + ":"+ BACKEND_PORT;

var backend = {
	students: FULL_BACKEND_URL + '/api/Students',
	studentGroups: FULL_BACKEND_URL + '/api/StudentGroups',

	messages: FULL_BACKEND_URL + '/api/Messages',
	sendMessageBatch: FULL_BACKEND_URL + '/api/Messages/sendMessageBatch',
	
	studentAdvices: FULL_BACKEND_URL + '/api/StudentAdvices',
	
	login: FULL_BACKEND_URL + '/api//Users/login',
	
}

var config = {
	backend_port: BACKEND_PORT,
	backend_url: FULL_BACKEND_URL,
	backend: backend
}

module.exports = config;