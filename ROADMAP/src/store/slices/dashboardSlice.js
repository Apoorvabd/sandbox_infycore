import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    summary: null,
    categoryBreakdown: [],
    cashflow: [],
    recentTransactions: [],
    isLoading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setDashboardLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setDashboardError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setSummary: (state, action) => {
            state.summary = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setCategoryBreakdown: (state, action) => {
            state.categoryBreakdown = action.payload;
        },
        setCashflow: (state, action) => {
            state.cashflow = action.payload;
        },
        setRecentTransactions: (state, action) => {
            state.recentTransactions = action.payload;
        },
    },
});

export const {
    setDashboardLoading,
    setDashboardError,
    setSummary,
    setCategoryBreakdown,
    setCashflow,
    setRecentTransactions,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
