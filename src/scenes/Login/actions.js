import apiClient from '../../util/apiClient';
import config from '../../config/config'

export const FETCH_LOGIN_BEGIN = 'FETCH_LOGIN_BEGIN';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';

export const login = (userDetails) => (dispatch) => {
    dispatch({ type: FETCH_LOGIN_BEGIN })
    apiClient.post(config.backend.login, userDetails)
        .then(resp => {

            const token = resp.data;
            dispatch(

                // TODO Send the userDetail from the action. ATM I`m not sure in this ACTION is the best
                // place to do it.
                {
                    type: FETCH_LOGIN_SUCCESS,
                    payload: {
                        userDetails: userDetails,
                        token: { token }
                    }
                }
            )
        })
        .catch(error => dispatch({ type: FETCH_LOGIN_FAILURE, payload: error.response.data }))
}

export const logout = () => (dispatch) => { dispatch({ type: LOGOUT }) }
