const roures = {
    home: '/',
    productList: '/product',
    productDetail: '/product/:id',
    notFound: '*',

    auth: {
        signIn: '/auth/sign-in',
        signUp: '/auth/sign-up',
        forgetPassword: '/auth/forget-password',
        changePassword: '/auth/change-password',
        resetPassword: '/auth/reset-password',
        checkMail: '/auth/check-mail',
        verification: '/auth/verification',
        signOut: '/auth/sign-out',
    },
    user: {
        cart: '/user/cart',
        emptyCart: '/user/empty-cart',
        checkout: '/user/checkout',
        order: '/user/order',
        orderDetail: '/user/order/:id',
        confirm: '/user/confirm',
        profile: '/user/profile',
        addAddress: '/user/profile/add-address',
    },
    admin: {
        dashboard: '/admin/dashboard',
        chatbot: '/admin/chatbot',
        knowledgeBase: '/admin/chatbot/knowledge-base',
        order: '/admin/order',
        orderDetail: '/admin/order/:id',
        product: '/admin/product',
        productDetail: '/admin/product/:id',
        promotion: '/admin/promotion',
        promotionDetail: '/admin/promotion/:id',
        user: '/admin/user',
    },
};

export default roures;
