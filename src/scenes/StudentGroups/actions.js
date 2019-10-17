import apiClient from '../../util/apiClient';
import config from '../../config/config'

export const FETCH_STUDENTS_GROUP_BEGIN = 'FETCH_STUDENTS_GROUP_BEGIN';
export const FETCH_STUDENTS_GROUP_SUCCESS = 'FETCH_STUDENTS_GROUP_SUCCESS';
export const FETCH_STUDENTS_GROUP_FAILURE = 'FETCH_STUDENTS_GROUP_FAILURE';

export const CREATE_STUDENTS_GROUP = 'CREATE_STUDENTS_GROUP';
export const CREATE_STUDENTS_GROUP_SUCCESS = 'CREATE_STUDENTS_GROUP_SUCCESS';
export const CREATE_STUDENTS_GROUP_FAILURE = 'CREATE_STUDENTS_GROUP_FAILURE';
export const RESET_NEW_STUDENTS_GROUP = 'RESET_NEW_STUDENTS_GROUP';

export const DELETE_STUDENTS_GROUP_SUCCESS = 'DELETE_STUDENTS_GROUP_SUCCESS';

// Action
export const fetchStudentGroupsBegin = () => ({
    type: FETCH_STUDENTS_GROUP_BEGIN
});

// Action
export const fetchStudentGroupsSuccess = courses => ({
    type: FETCH_STUDENTS_GROUP_SUCCESS,
    payload: { courses }
});

export const fetchStudentGroupsFailure = error => ({
    type: FETCH_STUDENTS_GROUP_FAILURE,
    payload: { error }
});


// Action creator
export function fetchStudentGroupList() {
    return dispatch => {
        dispatch(fetchStudentGroupsBegin());

        const GET_COURSES = {
            query: `
                query getCourses {
                    courses {
                        _id
                        name
                        description
                        enrollments {
                            student {
                                name
                            }
                         }
                    }
                }
            `
        }

        return apiClient.post("/graphql", GET_COURSES)
            .then(({ data }) => {

                dispatch(fetchStudentGroupsSuccess(data.data.courses));
                return data.data.courses;
            })
            .catch(error => dispatch(fetchStudentGroupsFailure(error)));
    };
}

export function createStudentGroup(studentGroup) {
    return async dispatch => {
        try {
            dispatch(createStudentGroupBegin());

            // fetch data from a url endpoint
            var data
            if (studentGroup.id) {
                data = await apiClient.put(config.backend.studentGroups, studentGroup);
            } else {
                data = await apiClient.post(config.backend.studentGroups, studentGroup);
            }

            dispatch(createStudentGroupSuccess(data));
            return data;

        } catch (error) {
            dispatch(createStudentGroupFailure(error))
        }
    }
}


export function deleteStudentGroup(id) {
    return async dispatch => {
        try {
            dispatch(createStudentGroupBegin());

            // fetch data from a url endpoint
            var data = await apiClient.delete(config.backend.studentGroups + "/" + id);
            dispatch({ type: DELETE_STUDENTS_GROUP_SUCCESS });

            return data;
        } catch (error) {
            dispatch(createStudentGroupFailure(error))
        }
    }
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

export function resetStudentGroup() {
    return {
        type: RESET_NEW_STUDENTS_GROUP
    }
};


/* export function createStudentGroup(props, tokenFromStorage) {
    const request = apiClient({
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

