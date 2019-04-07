import {
    FETCH_MESSAGE_BEGIN,
    FETCH_MESSAGE_SUCCESS,
    FETCH_MESSAGE_FAILURE,

} from './actions';

const initialState = {
    messageList: [],

    loading: false,
    error: null,
};

export default function messagesReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case FETCH_MESSAGE_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_MESSAGE_SUCCESS:
            return { ...state, loading: false, messageList: payload.data};
        case FETCH_MESSAGE_FAILURE:
            return { ...state, loading: false, error: payload.error, messageList: [] };

        default:
            return state;
    }
}