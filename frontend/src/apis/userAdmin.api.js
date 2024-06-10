const { default: configs } = require('~/configs');
const { default: http } = require('~/utils/http');

const UserAdminAPI = {
    getAll: async () => {
        return await http.get(configs.baseUrl.admin.user.getAll);
    },
};

export default UserAdminAPI;
