
export const SHOW_INFO_MESSAGE = 'SHOW_INFO_MESSAGE';
export const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE';
export const SHOW_WARNING_MESSAGE = 'SHOW_WARNING_MESSAGE';
export const SHOW_SUCCESS_MESSAGE = 'SHOW_SUCCESS_MESSAGE';
export const HIDE_PANEL_MESSAGE = 'HIDE_PANEL_MESSAGE';

let timer = null;

const timerHideMessage = (dispatch) => {
    clearInterval(timer);
    timer = setInterval(() => {
        dispatch({ type: HIDE_PANEL_MESSAGE });
        clearInterval(timer);
    }, 5000);
}

export function showError(description) {
    return dispatch => {
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: description });
        timerHideMessage(dispatch);
    }
}

export function showWarning(description) {
    return dispatch => {
        dispatch({ type: SHOW_WARNING_MESSAGE, payload: description });
        timerHideMessage(dispatch);
    }
}

export function showInfo(description) {
    return dispatch => {
        dispatch({ type: SHOW_INFO_MESSAGE, payload: description });
        timerHideMessage(dispatch);
    }
}

export function showSuccess(description) {
    return dispatch => {

        dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: description });
        timerHideMessage(dispatch);
    }
}

export function hideMessage() {
    return dispatch => {
        dispatch({ type: HIDE_PANEL_MESSAGE });
    }
}