import {
    verifyLoginSessionStarted,
    verifyLoginSessionEnd,

    userLoginStarted, 
    userLoginFailure, 
    userLoginSuccess,

    userLogout
} from "../actions/authActions";

import { 
    verifyLoginSessionApi, 
    userLoginApi, 
    userLogoutApi
} from '../../services/auth_api';

// handle user login
export const userLoginAsync = (data) => async dispatch => {
    dispatch(userLoginStarted());
    const result = await userLoginApi(data);
    if (result.error) {
        dispatch(userLoginFailure(result.msg));
    }
    else {
        dispatch(userLoginSuccess(result.data));
    }
}

// verify login session
export const verifyLoginSessionAsync = (silentAuth = false) => async dispatch => {
    dispatch(verifyLoginSessionStarted(silentAuth));
    const result = await verifyLoginSessionApi();
    if (result.error) {
        dispatch(verifyLoginSessionEnd());
        dispatch(userLogout());
    }
    else {
        dispatch(userLoginSuccess(result.data));
    }
}

// handle user logout
export const userLogoutAsync = () => dispatch => {
    dispatch(userLogout());
    userLogoutApi();
}