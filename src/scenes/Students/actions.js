import axios from 'axios';
import config from '../../config/config'

export const FETCH_STUDENTS_BEGIN = 'FETCH_STUDENTS_BEGIN';
export const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
export const FETCH_STUDENTS_FAILURE = 'FETCH_STUDENTS_FAILURE';

// Action
export const fetchStudentsBegin = () => ({
    type: FETCH_STUDENTS_BEGIN
});

// Action
export const fetchStudentsSuccess = students => ({
    type: FETCH_STUDENTS_SUCCESS,
    payload: { students }
});

export const fetchStudentsFailure = error => ({
    type: FETCH_STUDENTS_FAILURE,
    payload: { error }
});

// Action creator
export function fetchStudentList() {
    return dispatch => {
        dispatch(fetchStudentsBegin());
        return axios.get(config.backend.students, { params: { filter: { include: 'advices' } } })
            .then(({ data }) => {
                dispatch(fetchStudentsSuccess(data));
                return data;
            })
            .catch(error => dispatch(fetchStudentsFailure(error)));
    };
}
