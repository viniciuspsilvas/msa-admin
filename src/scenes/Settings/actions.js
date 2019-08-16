import apiClient from '../../util/apiClient';
import config from '../../config/config'

export const FETCH_SETTINGS_BEGIN = 'FETCH_SETTINGS_BEGIN';
export const FETCH_SETTINGS_SUCCESS = 'FETCH_SETTINGS_SUCCESS';
export const FETCH_SETTINGS_FAILURE = 'FETCH_SETTINGS_FAILURE';


// Action creator
export function fetchConfigList() {
    return dispatch => {

        dispatch({ type: FETCH_SETTINGS_BEGIN });

        return apiClient.get(config.backend.taskScheduler)
            .then(({ data }) => {
                dispatch({ type: FETCH_SETTINGS_SUCCESS, payload: { data } });
                return data;
            })
            .catch(error => dispatch({ type: FETCH_SETTINGS_FAILURE, payload: { error } }));
    };
}