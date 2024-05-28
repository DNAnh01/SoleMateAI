import configs from '~/configs';
import http from '~/utils/http';

const addressApi = {
    addOrCheckAddress: async ({ province, district, ward }) =>
        await http.post(configs.baseUrl.address.addOrCheckAddress, { province, district, ward }),

    getCurrentShippingAddress: async () => await http.get(configs.baseUrl.address.getCurrentShippingAddress),
};
export default addressApi;
