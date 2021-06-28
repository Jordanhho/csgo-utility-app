const root_url = "/csgo-app";

const staticRoutes = {
    main: {
        personal_website: "/",
        home: root_url,
        maps: `${root_url}/maps`,
        mapWithUtils: `${root_url}/map/:map_id/:util_id?`,
        mapTemplate: (map_id) => `${root_url}/map/${map_id}`,
        utilTemplate: (map_id, util_id) => `${root_url}/map/${map_id}/${util_id}`,
        utilDetail: `${root_url}/map/:map_id/:util_id`,
    },
    member: {
        home: "/member",
        login: "/member/login",
        signUp: "/member/login/signup",
        activateAccount: "/member/login/activate_account/:email/:activation_code?",
        activateAccountTemplate: (email, activation_code = "") => `/member/login/activate_account/${email}/${activation_code}`,
        forgotPassword: "/member/login/forgot-password"
    }
}
export default staticRoutes;