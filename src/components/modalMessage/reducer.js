import {
    FETCH_MODAL_STUDENTS_BEGIN,
    FETCH_MODAL_STUDENTS_SUCCESS,
    FETCH_MODAL_STUDENTS_FAILURE,
    TOGLE_MODAL_MESSAGE,

    SEND_NOTIFICATION_BEGIN,
    SEND_NOTIFICATION_SUCCESS,
    SEND_NOTIFICATION_FAILURE

} from './actions';

const initialState = {

    isLoading: true,
    error: null,
    studentList: [],

    isOpen: false,

    studentSelected: {}
};

export default function modalMessageReducer(state = initialState, action = {}) {

    const { type, payload } = action;

    switch (type) {

        case TOGLE_MODAL_MESSAGE:

        // In case the modal is being closed then clean the studentSelect
            if (state.isOpen) {
                return {
                    ...state,
                    isOpen: !state.isOpen,
                    studentSelected: {}
                };
            }

            return {
                ...state,
                isOpen: !state.isOpen
            };

        case FETCH_MODAL_STUDENTS_BEGIN:
            return Object.assign({}, state, { isLoading: true })

        case FETCH_MODAL_STUDENTS_SUCCESS:
            return Object.assign({}, state, { studentList: payload.data, isLoading: false })

        case FETCH_MODAL_STUDENTS_FAILURE:
            return Object.assign({}, state, { error: payload })


        case SEND_NOTIFICATION_BEGIN:
            return { ...state, isLoading: true };

        case SEND_NOTIFICATION_SUCCESS:
            return { ...state, isLoading: false };

        case SEND_NOTIFICATION_FAILURE:
            return { ...state, error: payload };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}

