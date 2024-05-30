import configs from '~/configs';
import http from '~/utils/http';

const cartAPI = {
    addCartItem: async ({ shoeId, quantity }) =>
        await http.post(configs.baseUrl.cart.addCartItem, { shoe_id: shoeId, quantity: quantity }),

    removeCartItem: async ({ shoeId }) => await http.delete(configs.baseUrl.cart.removeCartItem, { shoe_id: shoeId }),

    removeMultipleCartItem: async (shoeIds) => {
        return await http.post(configs.baseUrl.cart.removeMultipleCartItem, {
            shoe_ids: shoeIds,
        });
    },

    getAllCartItem: async () => await http.get(configs.baseUrl.cart.getAllCartItem),
};
export default cartAPI;
