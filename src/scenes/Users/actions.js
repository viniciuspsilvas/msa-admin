import apiClient from '../../util/apiClient';

export const FETCH_USERS_BEGIN = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';


const GET_USERS = {
    query: `
        query users {
            users {
                _id
                username
                password
                email
                firstname
                lastname
                isActive
                isAdmin
            }
        }
    `
}

// Action creator
export const fetchUserList = () => async dispatch => {
    try {
        dispatch({ type: FETCH_USERS_BEGIN });
        const { data } = await apiClient.post("/graphql", GET_USERS);

        if (data.errors) throw new Error(data.errors[0].message);

        dispatch(
            {
                type: FETCH_USERS_SUCCESS,
                payload: data.data.users
            }
        );

        return data.data.users;

    } catch (error) {
        dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
}
