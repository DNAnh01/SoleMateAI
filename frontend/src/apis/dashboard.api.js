import configs from '~/configs';
import http from '~/utils/http';

const dashboardApi = {
    async fetchChartStatsByDay({ day }) {
        return await http.get(`${configs.baseUrl.admin.dashboard.getChartStatsByDay}${day}`);
    },
    async fetchChartStatsByMonth({ month }) {
        return await http.get(`${configs.baseUrl.admin.dashboard.getChartStatsByMonth}${month}`);
    },
    async fetchTotalStatsByDay({ day }) {
        return await http.get(`${configs.baseUrl.admin.dashboard.getTotalStatsByDay}${day}`);
    },
    async fetchTotalStatsByMonth({ month }) {
        return await http.get(`${configs.baseUrl.admin.dashboard.getTotalStatsByMonth}${month}`);
    },
};

export default dashboardApi;
