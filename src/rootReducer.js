import { combineReducers } from "redux";
import studentReducer from "./scenes/Students/reducer";
import modalMessageReducer from "./components/modalMessage/reducer";

export default combineReducers({
    studentReducer, modalMessageReducer
});