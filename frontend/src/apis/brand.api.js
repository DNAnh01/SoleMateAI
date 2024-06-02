const { default: http } = require('~/utils/http');

const brandAPI = {
    async getAll() {
        return http.get('/brand/get-all');
    },
};
export default brandAPI;
