import axios from "axios";

import { 
    API_URL, 
    authApiRoutes 
} from "../routes/api_routes";

import {
    handleApi
} from "./api_utility";

//force send credentials (cookies) to every axios request
axios.defaults.withCredentials = true;

const VERIFY_LOGIN_SESSION_TIMEOUT_MS = 300; //300 ms for verifying login session.

//** Sign Up Process */

//sign up for user
export const userSignUpApi = async (data) => {
    try {
        let res = await axios.post(API_URL + authApiRoutes.SIGNUP, data);
        return handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

export const activateAccountApi = async (data) => {
    try {
        let res = await axios.post(API_URL + authApiRoutes.ACTIVATE_ACCOUNT, data);
        return handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

//** User login process */

// user login API to validate the credential
export const userLoginApi = async (data) => {
    try {
        let res = await axios.post(API_URL + authApiRoutes.LOGIN, data);
        return handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

export const userLogoutApi = async () => {
    try {
        let res = await axios.post(API_URL + authApiRoutes.LOGOUT);
        return handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

//** Verify Login Session Process */

// set access token to the axios header
export const setAccessTokenApi = (accessToken) => {
    if (accessToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
    else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

// verify refresh token to generate new access token if refresh token is present
export const verifyLoginSessionApi = async () => {
    try {
        let result = await axios({
                method: "post",
                url: (API_URL + authApiRoutes.VERIFY_LOGIN_SESSION),
                timeout: VERIFY_LOGIN_SESSION_TIMEOUT_MS
        });
        return handleApi(result);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

/** reset password process */

export const sendResetPasswordEmailApi = async (email) => {
    try {
        let res = await axios.post(API_URL + authApiRoutes.SEND_RESET_PASSWORD_EMAIL, email);
        return handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

// check if reset password link is valid
export const verifyResetPasswordCodeApi = async (verification_code) => {
    try {
        let res = await axios.post(API_URL + authApiRoutes.VERIFY_RESET_PASSWORD_CODE, verification_code);
        return handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

// send request to reset password with email 
export const resetPasswordApi = async (data) => {
    try {
        let res = await axios.post(API_URL + authApiRoutes.RESET_PASSWORD, data);
        return handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}