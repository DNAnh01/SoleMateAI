const { default: http } = require('~/utils/http');

const colorApi = {
    async getAll() {
        return http.get('/color/get-all');
    },
};
export default colorApi;
