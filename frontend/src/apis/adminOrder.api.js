const { default: configs } = require('~/configs');
const { default: http } = require('~/utils/http');

const adminOrderAPI = {
    async getAll() {
        return http.get(configs.baseUrl.order.getAll);
    },
};
export default adminOrderAPI;
