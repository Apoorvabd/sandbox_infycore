import api from "../../api/axios";
export const getDashboardSummary =async () => {
    try {
        const response = await api.get("/dashboard/summary");
        
        // console.log("Dashboard summary fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard summary:", error);
        throw error;
    };
}
export const getCategoryBreakdown = async () => {
    try {
        const response = await api.get("/dashboard/categories");
        console.log("Category breakdown fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching category breakdown:", error);
        throw error;
    }
}
export const getMonthlyCashflow = async () => {
    try {
        const response = await api.get("/dashboard/cashflow");
        console.log("Monthly spending fetched successfully:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching monthly spending:", error);
        throw error;
    }
}
export const getRecentTransactions = async (limit = 9) => {
    try {
        const response = await api.get("/dashboard/recent_transactions?limit=" + limit);
        console.log("Recent transactions fetched successfully:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching recent transactions:", error);
        throw error;
    }
}

