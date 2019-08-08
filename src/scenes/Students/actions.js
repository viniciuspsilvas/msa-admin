import axios from 'axios';
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

// Action
const fetchStudentsSuccess = students => ({
    type: FETCH_STUDENTS_SUCCESS,
    payload: { students }
});

// Action creator
export function fetchStudentList() {
    return dispatch => {

        dispatch({ type: FETCH_STUDENTS_BEGIN });
        const params = { params: { filter: { include: 'advices' } } }

        return axios.get(config.backend.students, params)
            .then(({ data }) => {
                dispatch(fetchStudentsSuccess(data));
                return data;
            })
            .catch(error => dispatch({ type: FETCH_STUDENTS_FAILURE, payload: { error } }));
    };
}

// Action creator
export function fetchStudentById(id) {
    return async dispatch => {

        try {
            dispatch({ type: FETCH_STUDENTS_BEGIN });
            const params = { params: { filter: { include: ['studentGroups', 'advices'] } } }

            // fetch data from a url endpoint
            var data = await axios.get(`${config.backend.students}/${id}`, params)

            dispatch({ type: FETCH_STUDENT_DETAIL_SUCCESS, payload: data.data });
            return data;

        } catch (error) {
            dispatch({ type: FETCH_STUDENTS_FAILURE, payload: { error } });
        }
    };
}

export const sendNotification = (data) => (dispatch) => {
    axios.post(config.backend.sendMessageBatch, { "data": data })
        .then(resp => dispatch({ type: SEND_NOTIFICATION_SUCCESS, payload: resp }))
        .catch(error => dispatch({ type: SEND_NOTIFICATION_FAILURE, payload: error }))
}

export function makeEnrollment(student, studentGroup) {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_STUDENTS_BEGIN });

            // verificar se ja existe 
            // consultar todos os enroll do student
            // se nao encontrar a relacao entao chamar o post pra criar uma nova
            const filter = { params: { filter: `{"where":{"studentId":"` + student.id + `", "studentGroupId":"` + studentGroup.id + `"}}` } }
            var result = await axios.get(config.backend.enrollments, filter);

            if (result.data.length === 0) {
                const enroll = {
                    date: Date.now(),
                    studentGroupId: studentGroup.id,
                    studentId: student.id
                }
                await axios.post(config.backend.enrollments, enroll);
            }

            dispatch({ type: UPDATE_STUDENT_DETAIL_SUCCESS});

        } catch (error) {
            dispatch({ type: FETCH_STUDENTS_FAILURE, payload: { error } });
        }
    }
}

export function deleteEnrollment(idGroup, idStudent) {
    return async dispatch => {
        try {
            dispatch({ type: ENROLLMENT_DELETED_BEGIN });

            const enroll = {
                idGroup : idGroup, 
                idStudent: idStudent
            }
            var result = await axios.delete(config.backend.enrollments+'/deleteEnrollment', {data : enroll});


            dispatch({ type: ENROLLMENT_DELETED_SUCCESS, payload:result});

        } catch (error) {
            dispatch({ type: ENROLLMENT_DELETED_FAILURE, payload: { error } });
        }
    }
}