import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';

import studentReducer from "../scenes/Students/reducer";
import studentGroupReducer from "../scenes/StudentGroups/reducer";
import modalMessageReducer from "../components/modalMessage/reducer";
 

export default combineReducers({
    studentReducer, 
    modalMessageReducer, 
    studentGroupReducer,
    form: formReducer
});