import {
    FETCH_STUDENTS_GROUP_BEGIN,
    FETCH_STUDENTS_GROUP_SUCCESS,
    FETCH_STUDENTS_GROUP_FAILURE,

    CREATE_STUDENTS_GROUP,
    CREATE_STUDENTS_GROUP_SUCCESS,
    CREATE_STUDENTS_GROUP_FAILURE,
    RESET_NEW_STUDENTS_GROUP

} from './actions';

const initialState = {

    studentGroup: {
        name: '',
        description: '',
        id: null
    },

    studentGroupList: [],
    loading: false,
    error: null,
};

export default function studentGroupReducer(state = initialState, action) {
    const { type, payload } = action;
    let error;

    switch (type) {

        case FETCH_STUDENTS_GROUP_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_STUDENTS_GROUP_SUCCESS:
            return { ...state, loading: false, studentGroupList: payload.courses };
        case FETCH_STUDENTS_GROUP_FAILURE:
            return { ...state, loading: false, error: payload.error, studentGroupList: [] };


        case CREATE_STUDENTS_GROUP:
            return { ...state, loading: true }
        case CREATE_STUDENTS_GROUP_SUCCESS:
            return { ...state, studentGroup: payload.data, error: null, loading: false }
        case CREATE_STUDENTS_GROUP_FAILURE:
            error = payload || { message: payload.message };//2nd one is network or server down errors
            return { ...state, studentGroup: null, error: error, loading: false }
        
        case RESET_NEW_STUDENTS_GROUP:
            return { ...state, studentGroup: initialState.studentGroup, error: null, loading: false }

        default:
            return state;
    }
}