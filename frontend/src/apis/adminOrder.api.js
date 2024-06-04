const { default: configs } = require('~/configs');
const { default: http } = require('~/utils/http');

const adminOrderAPI = {
    async getAll() {
        return http.get(configs.baseUrl.order.getAll);
    },
    async cancelOrder(id) {
        return http.patch(`${configs.baseUrl.order.cancelOrderById}${id}`);
    },
    async deliveOrder(id) {
        return http.patch(`${configs.baseUrl.order.deliveOrder}${id}`);
    },
};
export default adminOrderAPI;
