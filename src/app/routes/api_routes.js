//switch between production and development to the reactjs server
export const API_URL = ((process.env.NODE_ENV === "development") 
    ? "http://localhost:8081"
    : "https://csgo-app.jordanho.ca"
);

export const authApiRoutes = {
    CSGO_APP_LOGIN: "/api/csgo-app/login",
    CSGO_APP_VERIFY_LOGIN_SESSION: "/api/csgo-app/auth/verify-login-session",
    CSGO_APP_LOGOUT: "/api/auth/logout",

    CSGO_APP_SIGNUP: "/api/csgo-app/auth/signup",
    CSGO_APP_ACTIVATE_ACCOUNT: "/api/csgo-app/auth/activate-account",

    CSGO_APP_SEND_RESET_PASSWORD_EMAIL: "/api/csgo-app/auth/send-reset-password-email",
    CSGO_APP_VERIFY_RESET_PASSWORD_CODE: "/api/csgo-app/auth/verify-reset-password-code",
    CSGO_APP_RESET_PASSWORD: "/api/csgo-app/auth/reset-password",
}

export const publicApiRoutes = {
    HOME: "/api/csgo-app/home",
    MAPS: "/api/csgo-app/maps",
    PUBLIC_UTIL_DETAIL: "/api/csgo-app/public/util-detail",
    PUBLIC_MAP_DETAIL: "/api/csgo-app/public/map-detail",
    LOGIN_SETTINGS: "/api/login-settings",
}

export const privateApiRoutes = {

}