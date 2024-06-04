const roures = {
    home: '/',
    productList: '/product',
    productDetail: '/product/:id',
    confirm: '/confirm',
    notFound: '*',

    auth: {
        signIn: '/auth/sign-in',
        signUp: '/auth/sign-up',
        forgetPassword: '/auth/forgot-password',

        resetPassword: '/auth/reset-password',
        signOut: '/auth/sign-out',
    },
    user: {
        cart: '/user/cart',
        emptyCart: '/user/empty-cart',
        paymentSuccess: '/user/payment-success',
        paymentFailure: '/user/payment-failure',
        order: '/user/order',
        emptyOrder: '/user/empty-order',
        orderDetail: '/user/order/:id',
        confirm: '/user/confirm',
        profile: '/user/profile',
        changePassword: '/user/change-password',
        addAddress: '/user/profile/add-address',
    },
    admin: {
        dashboard: '/admin/dashboard',
        chatbot: '/admin/chatbot',
        knowledgeBase: '/admin/chatbot/knowledge-base',
        order: '/admin/order',
        orderDetail: '/admin/order/detail',
        product: '/admin/product',
        productDetail: '/admin/product/detail',
        promotion: '/admin/promotion',
        promotionDetail: '/admin/promotion/detail',
        user: '/admin/user',
    },
};

export default roures;
