const staticRoutes = {
    personal_website: 'https://jordanho.ca/',
    main: {
        name: 'Home',
        abs: '/',
        relLink: '/',
        layoutLink: '/*',
        maps: {
            name: 'Maps',
            abs: '/maps',
            relLink: '/maps',
        },
        mapDetail: {
            name: 'Map Util',
            abs: '/map/:map_id',
            relLink: '/map/:map_id/*',
            utilDetail: {
                name: 'Util Details',
                abs: '/map/:map_id/:util_id',
                relLink: ':util_id',
            },
            utilTemplate: (map_id, util_id) => `/map/${map_id}/${util_id}`,
        },
        mapTemplate: (map_id) => `/map/${map_id}`,
    },
    member: {
        name: 'Member',
        abs: '/member',
        relLink: '/',
        layoutLink: '/member/*',
        login: {
            name: 'Login',
            abs: '/member/login/',
            relLink: '/',
            layoutLink: '/login/*',
            signUp: {
                name: 'Sign Up',
                abs: '/member/login/signup',
                relLink: '/signup',
            },
            activateAccount: {
                name: 'Member Activate Account',
                abs: '/member/login/activate_account/:email/:activation_code?',
                relLink: '/activate_account/:email/:activation_code?',
            },
            forgotPassword: {
                name: 'Forgot Password',
                abs: '/member/login/forgot-password',
                relLink: '/forgot-password',
            },
            activateAccountTemplate: (email, activation_code = "") => `/member/login/activate_account/${email}/${activation_code}`,
        },
    }
}
export default staticRoutes;