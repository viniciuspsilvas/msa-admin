import axios from 'axios';
import config from '../../config/config'

export const FETCH_STUDENTS_BEGIN = 'FETCH_STUDENTS_BEGIN';
export const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
export const FETCH_STUDENTS_FAILURE = 'FETCH_STUDENTS_FAILURE';


// Action
export const fetchStudentsSuccess = students => ({
    type: FETCH_STUDENTS_SUCCESS,
    payload: { students }
});


// Action creator
export function fetchStudentList() {
    return dispatch => {

        dispatch({ type: FETCH_STUDENTS_BEGIN });

        return axios.get(config.backend.students, { params: { filter: { include: 'advices' } } })
            .then(({ data }) => {
                dispatch(fetchStudentsSuccess(data));
                return data;
            })
            .catch(error => dispatch({ type: FETCH_STUDENTS_FAILURE, payload: { error } }));
    };
}

export const SEND_NOTIFICATION_BEGIN = 'SEND_NOTIFICATION_BEGIN';
export const SEND_NOTIFICATION_SUCCESS = 'SEND_NOTIFICATION_SUCCESS';
export const SEND_NOTIFICATION_FAILURE = 'SEND_NOTIFICATION_FAILURE';

export const sendNotification = (data) => (dispatch) => {
    axios.post(config.backend.sendMessageBatch, { "data": data })
        .then(resp => dispatch({ type: SEND_NOTIFICATION_SUCCESS, payload: resp }))
        .catch(error => dispatch({ type: SEND_NOTIFICATION_FAILURE, payload: error }))
}