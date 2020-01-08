import {
    FETCH_USERS_BEGIN,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    CREATE_USER_SUCCESS
} from './actions';

const initialState = {
    userList: [],
    user: {},
    loading: false,
    error: null,
};

export default function userReducer(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {

        case FETCH_USERS_BEGIN:
            return { ...state, loading: true, error: null };

        case FETCH_USERS_SUCCESS:
            return { ...state, loading: false, userList: payload.users };

        case CREATE_USER_SUCCESS:
            return { ...state, loading: false, user: payload.user };

        case FETCH_USERS_FAILURE:
            return { ...state, loading: false, error: payload, userList: [] };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}