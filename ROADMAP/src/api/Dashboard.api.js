import api from "./axios";

export const getDashboardSummary = () =>
    api.get("/dashboard/summary");

export const getCategoryBreakdown = () =>
    api.get("/dashboard/category-breakdown");

export const getCashflow = () =>
    api.get("/dashboard/cashflow");

export const getRecentTransactions = (limit = 10) =>
    api.get(`/dashboard/recent-transactions?limit=${limit}`);