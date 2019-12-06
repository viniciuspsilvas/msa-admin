import apiClient from '../../util/apiClient';

export const FETCH_STUDENTS_BEGIN = 'FETCH_STUDENTS_BEGIN';
export const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
export const FETCH_STUDENTS_FAILURE = 'FETCH_STUDENTS_FAILURE';

export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_STUDENT_DETAIL_SUCCESS = 'FETCH_STUDENT_DETAIL_SUCCESS';
export const UPDATE_STUDENT_DETAIL_SUCCESS = 'UPDATE_STUDENT_DETAIL_SUCCESS';
export const ENROLLMENT_DELETED_SUCCESS = 'ENROLLMENT_DELETED_SUCCESS'


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
                firstname
                lastname
                email
                phone
                isActive
                device {
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
                firstname
                lastname
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

const SEND_MESSAGE_BATCH = `
    mutation sendMessageBatch($message: MessageInput!){
        sendMessageBatch(message:$message) {
            _id
        }
    }
`

const ACTIVE_STUDENT = `
    mutation activeStudent($_ids:[ID!]!, $isActive:Boolean!) {
        activeStudent(_ids:$_ids, isActive:$isActive)
    }
`

// Action
const fetchStudentsSuccess = students => ({
    type: FETCH_STUDENTS_SUCCESS,
    payload: { students }
});

// Action creator
export const fetchStudentList = () => async dispatch => {
    try {
        dispatch({ type: FETCH_STUDENTS_BEGIN });
        const { data } = await apiClient.post("/graphql", GET_STUDENTS);

        if (data.errors) throw new Error(data.errors[0].message);

        dispatch(fetchStudentsSuccess(data.data.students));
        return data.data.students;

    } catch (error) {
        dispatch({ type: FETCH_STUDENTS_FAILURE, payload: error.message });
    }
}

// Action creator
export function fetchStudentById(id) {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_STUDENTS_BEGIN });

            // fetch data from a url endpoint
            var { data } = await apiClient.post("/graphql", {
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

export const sendNotification = message => async dispatch => {
    try {
        dispatch({ type: FETCH_STUDENTS_BEGIN });

        // Clean all fields of all students except the ID field
        if (message && message.students && message.students.length > 0)
            message.students = message.students.map(student => ({ _id: student._id }));

        // fetch data from a url endpoint
        var { data } = await apiClient.post("/graphql", {
            query: SEND_MESSAGE_BATCH,
            variables: {
                message
            }
        })

        /// handle error
        if (data.errors) {
            throw data.errors[0].message;
        } else {
            dispatch({ type: FETCH_SUCCESS, payload: data.data.sendMessageBatch })
        }

        return data.data;
    } catch (error) {
        dispatch({ type: FETCH_STUDENTS_FAILURE, payload: error })
    }
}

export function makeEnrollment(student, course) {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_STUDENTS_BEGIN });

            // fetch data from a url endpoint
            var { data } = await apiClient.post("/graphql", {
                query: CREATE_ENROLL,
                variables: {
                    enroll: { student, course }
                },
            })

            const { createEnrollment } = data.data;

            if (createEnrollment) {
                dispatch({ type: UPDATE_STUDENT_DETAIL_SUCCESS });

            } else {
                throw data.errors
            }

        } catch (error) {
            dispatch({ type: FETCH_STUDENTS_FAILURE, payload: error });
            throw new Error("Error making enrollment.")
        }
    }
}

export function deleteEnrollment(id) {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_STUDENTS_BEGIN });

            // fetch data from a url endpoint
            var { data } = await apiClient.post("/graphql", {
                query: DELETE_ENROLL,
                variables: { id }
            })

            const { deleteEnrollment } = data.data;

            if (deleteEnrollment) {
                dispatch({ type: ENROLLMENT_DELETED_SUCCESS, payload: deleteEnrollment });

            } else {
                throw data.errors
            }

        } catch (error) {
            dispatch({ type: FETCH_STUDENTS_FAILURE, payload: error });
            throw new Error("Error deleting enrollment.")
        }
    }
}

export const activeStudent = (ids, isActive) => async dispatch => {
    try {
        dispatch({ type: FETCH_STUDENTS_BEGIN });

        // fetch data from a url endpoint
        var { data } = await apiClient.post("/graphql", {
            query: ACTIVE_STUDENT,
            variables: { _ids: ids, isActive }
        })

        if (data.errors) throw new Error(data.errors[0].message)

        const { activeStudent } = await data.data;
        dispatch({ type: FETCH_SUCCESS });
        return activeStudent;

    } catch (error) {
        dispatch({ type: FETCH_STUDENTS_FAILURE, payload: error.message });
        throw new Error("Error updating student.")
    }
}