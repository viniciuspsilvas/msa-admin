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


export function saveStudent(student) {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_STUDENTS_BEGIN });
            var data = await axios.put(config.backend.students, student);

            // verificar se ja existe 
            // consultar todos os enroll do student
            // se nao encontrar a relacao entao chamar o post pra criar uma nova
            const filter = { params: { filter: `{"where":{"studentId":"` + student.id + `", "studentGroupId":"` + student.studentGroup.id + `"}}` } }
            var result = await axios.get(config.backend.enrollments, filter);

            if (result.data.length == 0) {
                const enroll = {
                    date: Date.now(),
                    studentGroupId: student.studentGroup.id,
                    studentId: student.id
                }
                await axios.post(config.backend.enrollments, enroll);
            }

            dispatch({ type: UPDATE_STUDENT_DETAIL_SUCCESS, payload: data.data });
            return data;

        } catch (error) {
            dispatch({ type: FETCH_STUDENTS_FAILURE, payload: { error } });
        }
    }
}