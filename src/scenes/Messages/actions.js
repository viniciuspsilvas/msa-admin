import axios from 'axios';
import config from '../../config/config'

export const FETCH_MESSAGE_BEGIN = 'FETCH_MESSAGE_BEGIN';
export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const FETCH_MESSAGE_FAILURE = 'FETCH_MESSAGE_FAILURE';


// Action creator
export function fetchMessageList() {
    return dispatch => {

        dispatch({ type: FETCH_MESSAGE_BEGIN });

        return axios.get(config.backend.messages, { params: { filter: { include: 'user' } } })
            .then(({ data }) => {
                dispatch({ type: FETCH_MESSAGE_SUCCESS, payload: { data } });
                return data;
            })
            .catch(error => dispatch({ type: FETCH_MESSAGE_FAILURE, payload: { error } }));
    };
}