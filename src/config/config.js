const BACKEND_URL= process.env.REACT_APP_SERVER_URL;
 
var backend = {
	students: '/api/Students',
	studentGroups: '/api/StudentGroups',
	enrollments: '/api/Enrollments',

	messages: '/api/Messages',
	sendMessageBatch: '/api/Messages/sendMessageBatch',
	studentAdvices: '/api/StudentAdvices',
	taskScheduler: '/api/TaskScheduler',

	login: '/api/Users/login',
}

var config = {
	backend_url: BACKEND_URL,
	backend: backend
}

module.exports = config;