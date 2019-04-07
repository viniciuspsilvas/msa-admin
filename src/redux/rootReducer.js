import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';

import studentReducer from "../scenes/Students/reducer";
import studentGroupReducer from "../scenes/StudentGroups/reducer";
import messagesReducer from "../scenes/Messages/reducer";

import loginReducer from "../scenes/Login/reducer";

export default combineReducers({
    form: formReducer,
    studentReducer, 
    studentGroupReducer,
    messagesReducer,
    loginReducer
});