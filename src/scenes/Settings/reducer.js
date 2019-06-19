import {
    FETCH_SETTINGS_BEGIN,
    FETCH_SETTINGS_SUCCESS,
    FETCH_SETTINGS_FAILURE,

} from './actions';

const initialState = {
    taskSchedulerList: [],

    loading: false,
    error: null,
};

export default function settingsReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case FETCH_SETTINGS_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_SETTINGS_SUCCESS:
            return { ...state, loading: false, taskSchedulerList: payload.data};
        case FETCH_SETTINGS_FAILURE:
            return { ...state, loading: false, error: payload.error, taskSchedulerList: [] };

        default:
            return state;
    }
}