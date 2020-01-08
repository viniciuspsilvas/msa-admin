import apiClient from '../../util/apiClient';

export const FETCH_USERS_BEGIN = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';

const GET_USERS = {
    query: `
        query users {
            users {
                _id
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

const SAVE_USER = `
mutation saveUser($user:UserInput!) {
    saveUser(userInput:$user) { 
        _id
        email
        password
        firstname
        lastname
        isActive
        isAdmin
  }
}
`

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


export function saveUser(user) {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_USERS_BEGIN });

            // fetch data from a url endpoint
            const resp = await apiClient
                .post("/graphql", {
                    query: SAVE_USER,
                    variables: {
                        user
                    },
                })

            dispatch({
                type: CREATE_USER_SUCCESS,
                payload: resp.data.data.saveUser
            });

            return resp.data;

        } catch (error) {
            dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
        }
    }
}