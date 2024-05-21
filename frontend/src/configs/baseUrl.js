const baseUrl = {
    url: process.env.REACT_APP_BASE_URL,
    product: {
        getAll: '/shoe/get-all',
        getById: '/shoe/shoe-id=',
    },
    auth: {
        signIn: '/auth/sign-in',
        signUp: '/auth/sign-up',
        forgotPassword: '/auth/forgot-password',
        signOut: '/auth/sign-out',
    },
};

export default baseUrl;
