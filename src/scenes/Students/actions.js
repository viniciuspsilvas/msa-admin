import apiClient from '../../util/apiClient';
import config from '../../config/config'

export const FETCH_STUDENTS_BEGIN = 'FETCH_STUDENTS_BEGIN';
export const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
export const FETCH_STUDENTS_FAILURE = 'FETCH_STUDENTS_FAILURE';

export const SEND_NOTIFICATION_BEGIN = 'SEND_NOTIFICATION_BEGIN';
export const SEND_NOTIFICATION_SUCCESS = 'SEND_NOTIFICATION_SUCCESS';
export const SEND_NOTIFICATION_FAILURE = 'SEND_NOTIFICATION_FAILURE';

export const FETCH_STUDENT_DETAIL_SUCCESS = 'FETCH_STUDENT_DETAIL_SUCCESS';
export const UPDATE_STUDENT_DETAIL_SUCCESS = 'UPDATE_STUDENT_DETAIL_SUCCESS';

export const ENROLLMENT_DELETED_BEGIN = 'ENROLLMENT_DELETED_BEGIN'
export const ENROLLMENT_DELETED_SUCCESS = 'ENROLLMENT_DELETED_SUCCESS'
export const ENROLLMENT_DELETED_FAILURE = 'ENROLLMENT_DELETED_FAILURE'

const CREATE_ENROLL = `
mutation createEnrollment($enroll:EnrollmentInput!) {
    createEnrollment (input:$enroll) {
      _id
    }
  }
`

const DELETE_ENROLL = `
mutation deleteEnrollment($id:ID!) {
    deleteEnrollment (_id:$id) {
      _id
    }
  }
`

const GET_STUDENTS = {
    query: `
        query getStudents {
            students {
                _id
                fullname
                email
                phone
                advices {
                    _id
                    description
                    isActive
                  }
            }
        }
    `
}

const GET_STUDENT_BY_ID =
    `query studentByID($id:ID!) {
            studentByID(_id : $id) {
                _id
                fullname
                email
                phone
                advices {
                    _id
                    description
                    isActive
                }
                enrollments {
                    _id
                    course {
                     _id
                     name
                   }
                 }
            }
        }
    `;

// Action
const fetchStudentsSuccess = students => ({
    type: FETCH_STUDENTS_SUCCESS,
    payload: { students }
});

// Action creator
export function fetchStudentList() {
    return dispatch => {

        dispatch({ type: FETCH_STUDENTS_BEGIN });

        return apiClient.post("/graphql", GET_STUDENTS)
            .then(({ data }) => {
                dispatch(fetchStudentsSuccess(data.data.students));
                return data.data.students;
            })
            .catch(error => dispatch({ type: FETCH_STUDENTS_FAILURE, payload: { error } }));
    };
}

// Action creator
export function fetchStudentById(id) {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_STUDENTS_BEGIN });

            // fetch data from a url endpoint
            var { data } = await apiClient.post("", {
                query: GET_STUDENT_BY_ID,
                variables: {
                    id: id
                },
            })

            var student = data.data.studentByID
            dispatch({ type: FETCH_STUDENT_DETAIL_SUCCESS, payload: student });

            return student;

        } catch (error) {
            dispatch({ type: FETCH_STUDENTS_FAILURE, payload: { error } });
        }
    };
}

export const sendNotification = (data) => (dispatch) => {
    apiClient.post(config.backend.sendMessageBatch, { "data": data })
        .then(resp => dispatch({ type: SEND_NOTIFICATION_SUCCESS, payload: resp }))
        .catch(error => dispatch({ type: SEND_NOTIFICATION_FAILURE, payload: error }))
}

export function makeEnrollment(student, course) {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_STUDENTS_BEGIN });

            // fetch data from a url endpoint
            var { data } = await apiClient.post("", {
                query: CREATE_ENROLL,
                variables: {
                    enroll: { student, course }
                },
            })

            const {createEnrollment} = data.data;

            if (createEnrollment){
                dispatch({ type: UPDATE_STUDENT_DETAIL_SUCCESS });

            } else {
                throw data.errors
            }

        } catch (error) {
            dispatch({ type: FETCH_STUDENTS_FAILURE, payload: error });
            throw "Error making enrollment."
        }
    }
}

export function deleteEnrollment(id) {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_STUDENTS_BEGIN });

            // fetch data from a url endpoint
            var { data } = await apiClient.post("", {
                query: DELETE_ENROLL,
                variables: { id }
            })

            const {deleteEnrollment} = data.data;

            if (deleteEnrollment){
                dispatch({ type: ENROLLMENT_DELETED_SUCCESS, payload: deleteEnrollment });

            } else {
                throw data.errors
            }

        } catch (error) {
            dispatch({ type: FETCH_STUDENTS_FAILURE, payload: error });
            throw "Error deleting enrollment."
        }
    }
}