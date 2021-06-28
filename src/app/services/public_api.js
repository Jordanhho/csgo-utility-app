import axios from "axios";

import {
    API_URL,
    publicApiRoutes
} from "../routes/api_routes";

import {
    handleApi
} from "./api_utility";


export async function getHomeApi() {
    try {
        let res = await axios.get(API_URL + publicApiRoutes.HOME);
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

export async function getMapsApi() {
    try {
        let res = await axios.get(API_URL + publicApiRoutes.MAPS);
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

export async function getPublicMapDetailApi(data) {
    try {
        let res = await axios.post(
            API_URL + publicApiRoutes.PUBLIC_MAP_DETAIL,
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

export async function getPublicUtilDetailApi(data) {
    try {
        let res = await axios.post(
            API_URL + publicApiRoutes.PUBLIC_UTIL_DETAIL,
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

export async function getLoginSettingsApi() {
    try {
        let res = await axios.get(API_URL + publicApiRoutes.LOGIN_SETTINGS);
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}