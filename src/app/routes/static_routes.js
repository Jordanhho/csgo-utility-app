const staticRoutes = {
    main: {
        personal_website: "/",
        home: "/",
        maps: `/maps`,
        mapWithUtils: `/map/:map_id/:util_id?`,
        mapTemplate: (map_id) => `/map/${map_id}`,
        utilTemplate: (map_id, util_id) => `/map/${map_id}/${util_id}`,
        utilDetail: `/map/:map_id/:util_id`,
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