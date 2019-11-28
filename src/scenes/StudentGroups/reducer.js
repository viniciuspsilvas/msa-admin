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

    courseList: [],
    loading: false,
    error: null,
};

export default function studentGroupReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case FETCH_STUDENTS_GROUP_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_STUDENTS_GROUP_SUCCESS:
            return { ...state, loading: false, courseList: payload };
        case FETCH_STUDENTS_GROUP_FAILURE:
            return { ...state, loading: false, error: payload, courseList: [] };


        case CREATE_STUDENTS_GROUP:
            return { ...state, loading: true }
        case CREATE_STUDENTS_GROUP_SUCCESS:
            return { ...state, studentGroup: payload, error: null, loading: false }
        case CREATE_STUDENTS_GROUP_FAILURE:
            return { ...state, studentGroup: null, error: payload, loading: false }
        
        case RESET_NEW_STUDENTS_GROUP:
            return { ...state, studentGroup: initialState.studentGroup, error: null, loading: false }

        default:
            return state;
    }
}