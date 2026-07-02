import api from "../../api/axios";

export const dashboardApi = {
    getSummary: async () => {
        return await api.get("/dashboard/summary");
    },

    // Backend route: GET /api/dashboard/categories
    getCategoryBreakdown: async () => {
        return await api.get("/dashboard/categories");
    },

    // Backend route: GET /api/dashboard/cashflow
    getCashflow: async () => {
        return await api.get("/dashboard/cashflow");
    },

    // Backend route: GET /api/dashboard/recent_transactions?limit=...
    getRecentTransactions: async (limit = 10) => {
        return await api.get(`/dashboard/recent_transactions?limit=${limit}`);
    },
};

