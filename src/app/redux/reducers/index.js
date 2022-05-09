// import currentUser from "./currentUser"; //TODO: remove this later
import auth from "Redux/reducers/auth";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth
});

export default rootReducer;