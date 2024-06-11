const baseUrl = {
    url: process.env.REACT_APP_BASE_URL,
    address: {
        addOrCheckAddress: '/address/',
        getCurrentShippingAddress: '/address/',
    },
    user: {
        updateProfile: '/user/profile',
    },
    order: {
        createOrder: '/order/',
        getHistoryOrder: '/order/get-all',
        getOrderById: '/order/order-id=',
        cancelOrderById: '/order/cancel/order-id=',
        getAll: '/admin-order/get-all',
        deliveOrder: '/admin-order/deliver/order-id=',
    },
    product: {
        getAll: '/shoe/get-all',
        getById: '/shoe/shoe-id=',
        delete: '/shoe/shoe-id=',
        create: '/shoe/',
        update: '/shoe/shoe-id=',
    },
    conversation: {
        createWithAuth: '/conversation/with-auth',
        createWithoutAuth: '/conversation/without-auth',
    },
    cart: {
        addCartItem: '/cart/add-cart-item',
        removeCartItem: '/cart/remove-cart-item',
        removeMultipleCartItem: '/cart/remove-multiple-cart-items',
        getAllCartItem: '/cart/get-all',
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
        changePassword: '/auth/change-password',
        signOut: '/auth/sign-out',
    },
    admin: {
        promotion: {
            getAll: '/admin-promotion/get-all',
            getById: '/admin-promotion/promotion-id=',
            update: '/admin-promotion/promotion-id=',
            create: '/admin-promotion/',
        },
        dashboard: {
            getChartStatsByDay: '/admin-dashboard/chart/day/',
            getChartStatsByMonth: '/admin-dashboard/chart/month/',
            getTotalStatsByDay: '/admin-dashboard/total/day/',
            getTotalStatsByMonth: '/admin-dashboard/total/month/',
        },
        user: {
            getAll: '/user/get-all',
            block: '/user/user-id=',
        },
    },
};

export default baseUrl;
