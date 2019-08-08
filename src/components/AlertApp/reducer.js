import {
    HIDE_PANEL_MESSAGE, SHOW_INFO_MESSAGE, SHOW_ERROR_MESSAGE,
    SHOW_WARNING_MESSAGE, SHOW_SUCCESS_MESSAGE
} from './actions';

const initialState = {
    type: "",
    description: "",
    isShowing: false
};

export default function alertAppReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case SHOW_INFO_MESSAGE:
        case SHOW_ERROR_MESSAGE:
        case SHOW_WARNING_MESSAGE:
        case SHOW_SUCCESS_MESSAGE:
            return { ...state, type: type, description: payload, isShowing: true };

        case HIDE_PANEL_MESSAGE:
            return initialState;

        default:
            return state;
    }
}