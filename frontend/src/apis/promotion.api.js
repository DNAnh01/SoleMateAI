import configs from '~/configs';
import http from '~/utils/http';

const promotionApi = {
    async getAllPromotion() {
        return await http.get(configs.baseUrl.admin.promotion.getAll);
    },
    async getPromotionById(id) {
        return await http.get(`${configs.baseUrl.admin.promotion.getById}${id}`);
    },
    async update(id, params) {
        return await http.patch(`${configs.baseUrl.admin.promotion.update}${id}`, params);
    },
};
export default promotionApi;
