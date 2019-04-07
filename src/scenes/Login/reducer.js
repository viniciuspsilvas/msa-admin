import {
    FETCH_LOGIN_BEGIN,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE,
    LOGOUT
} from './actions';

const initialState = {
    isFetching: false,
    error: null,

    isAuthenticated: false,
    userDetails: {
        token: {}
    },
};

export default function loginReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case FETCH_LOGIN_BEGIN:
            return { ...state, isFetching: true, error: null };
        case FETCH_LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                userDetails: payload
            };
        case FETCH_LOGIN_FAILURE:
            return { ...state, isFetching: false, error: payload.error, userDetails: {} };
        
        case LOGOUT:
            return {
                ...state,
                
                isAuthenticated: false,
                userDetails: {}
            };
        default:
            return state;
    }
}