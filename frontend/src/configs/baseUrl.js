const baseUrl = {
    url: process.env.REACT_APP_BASE_URL,

    auth: {
        signIn: '/auth/sign-in',
        signUp: '/auth/sign-up',
        forgotPassword: '/auth/forgot-password',
        signOut: '/auth/sign-out',
    },
};

export default baseUrl;
