import api from "../../../api/axios";

export const dashboardApi = {
    getSummary: async () => {
        return await api.get("/dashboard/summary");
    },
    getCategoryBreakdown: async () => {
        return await api.get("/dashboard/category-breakdown");
    },
    getCashflow: async () => {
        return await api.get("/dashboard/monthly-cashflow");
    },
    getRecentTransactions: async (limit = 10) => {
        return await api.get(`/dashboard/recent-transactions?limit=${limit}`);
    },
};
