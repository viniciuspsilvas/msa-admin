import {
    FETCH_LOGIN_BEGIN,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE,
} from './actions';

const initialState = {
    loading: false,
    error: null,
    userDetails: {

        token: {}
    },
};

export default function loginReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case FETCH_LOGIN_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_LOGIN_SUCCESS:
            return {
                ...state, 
                loading: false, 
                
                userDetails: payload
            };
        case FETCH_LOGIN_FAILURE:
            return { ...state, loading: false, error: payload.error, userDetails: {} };

        default:
            return state;
    }
}