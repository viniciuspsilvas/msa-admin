import {
    FETCH_STUDENTS_BEGIN,
    FETCH_STUDENTS_SUCCESS,
    FETCH_STUDENTS_FAILURE,
    FETCH_STUDENT_DETAIL_SUCCESS,
    SEND_NOTIFICATION_SUCCESS
} from './actions';

const initialState = {
    studentList: [],
    loading: false,
    error: null,

    modalOpen: false,
    studentSelected: {},

    studentDetails: {}


};

export default function studentReducer(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {

        case FETCH_STUDENTS_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_STUDENTS_SUCCESS:

            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            return {
                ...state,
                loading: false,
                studentList: payload.students
            };

        case FETCH_STUDENTS_FAILURE:
            // The request failed. It's done. So set loading to "false".
            // Save the error, so we can display it somewhere.
            // Since it failed, we don't have items to display anymore, so set `items` empty.
            //
            // This is all up to you and your app though:
            // maybe you want to keep the items around!
            // Do whatever seems right for your use case.


            return {
                ...state,
                loading: false,
                error: payload,
                studentList: []
            };

        case FETCH_STUDENT_DETAIL_SUCCESS:

            return {
                ...state, loading: false, studentDetails: payload
            };

        case SEND_NOTIFICATION_SUCCESS:

            return {
                ...state,
                loading: false
            }

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}