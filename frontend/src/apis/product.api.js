const { default: configs } = require('~/configs');
const { default: http } = require('~/utils/http');

const productApi = {
    async fetchProductByName(shoeName) {
        return await http.get(`${configs.baseUrl.product.getAll}?filter={"shoe_name__like":"%${shoeName}%"}&limit=6`);
    },
    async getAll() {
        return http.get(configs.baseUrl.product.getAll);
    },
    async getById(shoeId) {
        return http.get(`${configs.baseUrl.product.getById}${shoeId}`);
    },
    async createNewProduct(params) {
        return http.post(`${configs.baseUrl.product.create}`, params);
    },
    async updateProduct(shoeID, params) {
        return http.patch(`${configs.baseUrl.product.update}${shoeID}`, params);
    },
    async delete(shoeId) {
        return http.delete(`${configs.baseUrl.product.delete}${shoeId}`);
    },
};
export default productApi;
