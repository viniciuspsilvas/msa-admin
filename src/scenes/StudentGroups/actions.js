import axios from 'axios';
import config from '../../config/config'

export const FETCH_STUDENTS_GROUP_BEGIN = 'FETCH_STUDENTS_GROUP_BEGIN';
export const FETCH_STUDENTS_GROUP_SUCCESS = 'FETCH_STUDENTS_GROUP_SUCCESS';
export const FETCH_STUDENTS_GROUP_FAILURE = 'FETCH_STUDENTS_GROUP_FAILURE';

export const CREATE_STUDENTS_GROUP = 'CREATE_STUDENTS_GROUP';
export const CREATE_STUDENTS_GROUP_SUCCESS = 'CREATE_STUDENTS_GROUP_SUCCESS';
export const CREATE_STUDENTS_GROUP_FAILURE = 'CREATE_STUDENTS_GROUP_FAILURE';
export const RESET_NEW_STUDENTS_GROUP = 'RESET_NEW_STUDENTS_GROUP';

// Action
export const fetchStudentGroupsBegin = () => ({
    type: FETCH_STUDENTS_GROUP_BEGIN
});

// Action
export const fetchStudentGroupsSuccess = studentGroups => ({
    type: FETCH_STUDENTS_GROUP_SUCCESS,
    payload: { studentGroups }
});

export const fetchStudentGroupsFailure = error => ({
    type: FETCH_STUDENTS_GROUP_FAILURE,
    payload: { error }
});

// Action creator
export function fetchStudentGroupList() {
    return dispatch => {
        dispatch(fetchStudentGroupsBegin());
        return axios.get(config.backend.studentGroups)
            .then(({ data }) => {
                dispatch(fetchStudentGroupsSuccess(data));
                return data;
            })
            .catch(error => dispatch(fetchStudentGroupsFailure(error)));
    };
}



// Action creator
export function createStudentGroup(newStudentGroup) {
    return dispatch => {
        dispatch(createStudentGroupBegin());
        return axios.post(config.backend.studentGroups, newStudentGroup)
            .then(({ data }) => {
                dispatch(createStudentGroupSuccess(data));
                return data;
            })
            .catch(error => dispatch(createStudentGroupFailure(error)));
    };
}

// Action
export const createStudentGroupBegin = () => ({
    type: CREATE_STUDENTS_GROUP
});

export function createStudentGroupSuccess(newPost) {
    return {
        type: CREATE_STUDENTS_GROUP_SUCCESS,
        payload: newPost
    };
}

export function createStudentGroupFailure(error) {
    return {
        type: CREATE_STUDENTS_GROUP_FAILURE,
        payload: error
    };
}

export function resetNewStudentGroup() {
    return {
        type: RESET_NEW_STUDENTS_GROUP
    }
};


/* export function createStudentGroup(props, tokenFromStorage) {
    const request = axios({
      method: 'post',
      data: props,
      //url: `${ROOT_URL}/posts`,
      headers: {
        'Authorization': `Bearer ${tokenFromStorage}`
      }
    });

    return {
      type: CREATE_STUDENTS_GROUP,
      payload: request
    };
  } */

