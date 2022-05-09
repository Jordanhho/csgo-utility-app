import axios from "axios";

import {
    handleApi
} from "Services/api_utility";

import {
    API_URL,
    privateApiRoutes
} from "Routes/api_routes";

//* Get Admin Home */
export async function getAdminSettingsApi(data) {
    try {
        let res = await axios.get(
            API_URL + privateApiRoutes.GET_ADMIN_SETTINGS,
            data
        );
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

//** Update Apps */

export async function updateAppsApi(data) {
    try {
        let res = await axios.post(
            API_URL + privateApiRoutes.UPDATE_APPS,
            data
        );
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

export async function removeAppApi(app_id) {
    try {
        let res = await axios.post(
            API_URL + privateApiRoutes.REMOVE_APP,
            app_id
        );
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

//** Update About Me */

export async function updateAboutMeApi(data) {
    try {
        let res = await axios.post(
            API_URL + privateApiRoutes.UPDATE_ABOUT_ME, 
            data
        );
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

/** Update Admin Home */
export async function updateAdminSettingsApi(data) {
    try {
        let res = await axios.post(
            API_URL + privateApiRoutes.UPDATE_ADMIN_SETTINGS,
            data
        );
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}


export async function updateResumeDisplayApi(data) {
    try {
        let res = await axios.post(
            API_URL + privateApiRoutes.UPDATE_RESUME_DISPLAY,
            data
        );
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

export async function updateJordanHoApi(data) {
    try {
        let res = await axios.post(
            API_URL + privateApiRoutes.UPDATE_JORDAN_HO,
            data,
            { //for file resume upload
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
        );
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

export async function getJordanHoApi(data) {
    try {
        let res = await axios.post(
            API_URL + privateApiRoutes.GET_JORDAN_HO,
            data
        );
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}