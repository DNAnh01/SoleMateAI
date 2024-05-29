import configs from '~/configs';
import http from '~/utils/http';

const orderApi = {
    // USER
    createOrder: async ({ province, district, ward }) =>
        await http.post(configs.baseUrl.order.createOrder, { province, district, ward }),

    getHistoryOrder: async () => await http.get(configs.baseUrl.order.getHistoryOrder),

    getHistoryOrderByFilter: async ({ status, orderDate }) => {
        const filter = JSON.stringify({
            status__like: `%${status}%`,
            order_date__like: `${orderDate}%`,
        });
        return await http.get(`${configs.baseUrl.order.getHistoryOrder}?filter=${encodeURIComponent(filter)}`);
    },

    getOrderById: async (orderId) => await http.get(`${configs.baseUrl.order.getOrderById}${orderId}`),

    cancelOrderById: async (orderId) => await http.patch(`${configs.baseUrl.order.cancelOrderById}${orderId}`),

    // ADMIN
};

export default orderApi;
