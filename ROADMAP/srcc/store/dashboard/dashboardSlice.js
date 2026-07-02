import {createSlice} from "@reduxjs/toolkit";
import {fetchDashboardSummary} from "./dashboardThunks";

const initialState = {
    summary: {
        totalAccounts: 0,
        totalBalance: 0,
        totalIncome: 0,
        totalExpense: 0,
        totalTransactions: 0,
    },
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardSummary.pending, (state) => {    
                console.log("Fetching dashboard summary...");
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
                console.log("Dashboard summary fetched successfully:", action.payload);
                state.loading = false;
                state.summary = action.payload;
            })
            .addCase(fetchDashboardSummary.rejected, (state, action) => {
                console.error("Error fetching dashboard summary:", action.payload);
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export default dashboardSlice.reducer;

export const selectSummary = (state) => state.dashboard.summary;