const BACKEND_PORT= "3000";
const BACKEND_URL= "http://localhost";

const FULL_BACKEND_URL = BACKEND_URL + ":"+ BACKEND_PORT;

var backend = {
	students: FULL_BACKEND_URL + '/students',
	groupStudents: FULL_BACKEND_URL + '/groupStudents'
}

var config = {
	backend_port: "3000",
	backend_url: FULL_BACKEND_URL,
	backend: backend
}

module.exports = config;