//switch between production and development to the reactjs server
export const API_URL = ((process.env.NODE_ENV === "development") 
    ? "http://localhost:8081"
    : "https://csgo-app.jordanho.ca"
);

export const authApiRoutes = {
    LOGIN: "/api/auth/login",
    VERIFY_LOGIN_SESSION: "/api/auth/verify-login-session",
    LOGOUT: "/api/auth/logout",

    SIGNUP: "/api/auth/signup",
    ACTIVATE_ACCOUNT: "/api/auth/activate-account",

    SEND_RESET_PASSWORD_EMAIL: "/api/auth/send-reset-password-email",
    VERIFY_RESET_PASSWORD_CODE: "/api/auth/verify-reset-password-code",
    RESET_PASSWORD: "/api/auth/reset-password",
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