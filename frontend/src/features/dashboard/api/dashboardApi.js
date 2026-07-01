import api from "../../../api/axios";

export const dashboardApi = {
    getSummary: async () => {
        return await api.get("/dashboard/summary");
    },
    getCategoryBreakdown: async () => {
        return await api.get("/dashboard/categories");
    },
    getCashflow: async () => {
        try {
            return await api.get("/dashboard/cashflow");
        } catch (error) {
            // Swagger documents this route as /dashboard/monthly-cashflow in some environments.
            if (error?.response?.status === 404) {
                return await api.get("/dashboard/monthly-cashflow");
            }
            throw error;
        }
    },
    getRecentTransactions: async (limit = 10) => {
        return await api.get(`/dashboard/recent_transactions?limit=${limit}`);
    },
};
