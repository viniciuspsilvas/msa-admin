import apiClient from '../../util/apiClient';

export const FETCH_LOGIN_BEGIN = 'FETCH_LOGIN_BEGIN';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';

const LOGIN_USER = `
        query loginUser($loginUserInput: LoginUserInput!) {
            loginUser (loginUserInput: $loginUserInput ){
            token
            user{
                    _id
                    username
                    isActive
                    isAdmin
                }
            }
        }
    `

export const login = userDetails => async dispatch => {
    dispatch({ type: FETCH_LOGIN_BEGIN });

    try {
        const { data } = await apiClient.post("/graphql", {
            query: LOGIN_USER,
            variables: {
                loginUserInput: {
                    username: userDetails.username,
                    password: userDetails.password
                }
            }
        })

        if (data.errors) throw new Error(data.errors[0].message)

        const { token, user } = data.data.loginUser
        localStorage.setItem('authToken', token);

        dispatch({
            type: FETCH_LOGIN_SUCCESS,
            payload: { ...user, token }
        })

    } catch (e) {
        dispatch({ type: FETCH_LOGIN_FAILURE, payload: e.message });
    }
}

export const logout = () => dispatch => {
    localStorage.clear();
    dispatch({ type: LOGOUT })
}
