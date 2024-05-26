import configs from '~/configs';
import http from '~/utils/http';

const cartAPI = {
    addCartItem: async ({ shoeId, quantity }) =>
        await http.post(configs.baseUrl.cart.addCartItem, { shoe_id: shoeId, quantity: quantity }),

    removeCartItem: async ({ shoeId }) => await http.post(configs.baseUrl.cart.removeCartItem, { shoe_id: shoeId }),

    getAllCartItem: async () => await http.get(configs.baseUrl.cart.getAllCartItem),
};
export default cartAPI;
