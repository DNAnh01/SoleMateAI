const baseUrl = {
    url: process.env.REACT_APP_BASE_URL,
    product: {
        getAll: '/shoe/get-all',
        getById: '/shoe/shoe-id=',
    },
    conversation: {
        createWithAuth: '/conversation/with-auth',
        createWithoutAuth: '/conversation/without-auth',
    },

    message: {
        createWithAuth: '/message/with-auth',
        createWithoutAuth: '/message/without-auth',
        getByConversationId: '/message/conversation-id=',
    },
    auth: {
        signIn: '/auth/sign-in',
        signUp: '/auth/sign-up',
        forgotPassword: '/auth/forgot-password',
        signOut: '/auth/sign-out',
    },
    admin: {
        promotion: {
            getAll: '/admin-promotion/get-all',
        },
    },
};

export default baseUrl;
