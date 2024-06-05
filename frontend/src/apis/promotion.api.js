import configs from '~/configs';
import http from '~/utils/http';

const promotionApi = {
    async getAllPromotion() {
        return await http.get(configs.baseUrl.admin.promotion.getAll);
    },
    async getPromotionById(id) {
        return await http.get(`${configs.baseUrl.admin.promotion.getById}${id}`);
    },
};
export default promotionApi;
