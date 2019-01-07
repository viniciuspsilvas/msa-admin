import axios from 'axios';
import config from '../../config/config'

export const FETCH_MODAL_STUDENTS_BEGIN = 'FETCH_MODAL_STUDENTS_BEGIN';
export const FETCH_MODAL_STUDENTS_SUCCESS = 'FETCH_MODAL_STUDENTS_SUCCESS';
export const FETCH_MODAL_STUDENTS_FAILURE = 'FETCH_MODAL_STUDENTS_FAILURE';

export const TOGLE_MODAL_MESSAGE = 'TOGLE_MODAL_MESSAGE';

export const SEND_NOTIFICATION_BEGIN = 'SEND_NOTIFICATION_BEGIN';
export const SEND_NOTIFICATION_SUCCESS = 'SEND_NOTIFICATION_SUCCESS';
export const SEND_NOTIFICATION_FAILURE = 'SEND_NOTIFICATION_FAILURE';

export const fetchStudentList = () => (dispatch) => {
    dispatch({ type: FETCH_MODAL_STUDENTS_BEGIN })
    axios.get(config.backend.students)
        .then(data => dispatch({ type: FETCH_MODAL_STUDENTS_SUCCESS, payload: data }))
        .catch(error => dispatch({ type: FETCH_MODAL_STUDENTS_FAILURE, payload: error }))
}

export const togleModalMessage = () => (dispatch) => {
    dispatch({ type: TOGLE_MODAL_MESSAGE })
}

export const sendNotification = (data) => (dispatch) => {
    axios.post(config.backend.sendMessageBatch, { "data": data })
        .then(resp => dispatch({ type: SEND_NOTIFICATION_SUCCESS, payload: resp }))
        .catch(error => dispatch({ type: SEND_NOTIFICATION_FAILURE, payload: error }))
}

