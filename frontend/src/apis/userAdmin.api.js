const { default: configs } = require('~/configs');
const { default: http } = require('~/utils/http');

const UserAdminAPI = {
    getAll: async () => {
        return await http.get(configs.baseUrl.admin.user.getAll);
    },
    block: async (id) => {
        return await http.patch(`${configs.baseUrl.admin.user.block}${id}`);
    },
};

export default UserAdminAPI;
