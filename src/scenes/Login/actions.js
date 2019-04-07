import axios from 'axios';
import config from '../../config/config'

export const FETCH_LOGIN_BEGIN = 'FETCH_LOGIN_BEGIN';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';


export const login = (userDetails) => (dispatch) => {
    dispatch({ type: FETCH_LOGIN_BEGIN })
    axios.post(config.backend.login, userDetails)
        .then(resp => dispatch(
            
            { type: FETCH_LOGIN_SUCCESS, payload: resp.data, userDetails:userDetails}
            
            
            ))
        .catch(error => dispatch({ type: FETCH_LOGIN_FAILURE, payload: error }))
}
