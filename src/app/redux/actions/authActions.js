import {
    VERIFY_LOGIN_SESSION_STARTED,
    VERIFY_LOGIN_SESSION_END,

    USER_LOGIN_STARTED, 
    USER_LOGIN_FAILURE, 

    USER_LOGIN_SUCCESS,
    USER_LOGOUT
} from "../constants/authTypes";

import {
    setAccessTokenApi
} from "../../services/auth_api";


// user login - start
export const userLoginStarted = () => {
    return {
        type: USER_LOGIN_STARTED
    }
}

// user login - failure
export const userLoginFailure = (error = 'Something went wrong. Please try again later.') => {
    return {
        type: USER_LOGIN_FAILURE,
        payload: {
            error
        }
    }
}

//get accessToken from successful login
export const userLoginSuccess = ({ accessToken, expiredAt, user }) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: {
            accessToken,
            expiredAt,
            user
        }
    }
}

// verify accessToken - start
export const verifyLoginSessionStarted = (silentAuth = false) => {
    return {
        type: VERIFY_LOGIN_SESSION_STARTED,
        payload: {
            silentAuth
        }
    }
}

// verify accessToken - end/failure
export const verifyLoginSessionEnd = () => {
    return {
        type: VERIFY_LOGIN_SESSION_END
    }
}

// handle user logout
export const userLogout = () => {
    setAccessTokenApi();
    return {
        type: USER_LOGOUT
    }
}