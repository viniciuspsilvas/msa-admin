export const actionTypes = {
    addShow: {
        LOGIN = "msa-admin/login/LOGIN"
    }
};


export const actions = {
    login = (credential) => ({ type: LOGIN, payload: credential })
};


const initialState = {
    shows: []
};


export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, shows: [...state.shows, action.payload] };
        default:
            return state;
    }
};