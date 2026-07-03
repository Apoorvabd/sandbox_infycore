import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auditFeed: [],
    stats: null,
    categoryBreakdown: [],
    isLoading: false,
    error: null,
};

const anomalySlice = createSlice({
    name: "anomaly",
    initialState,
    reducers: {
        setAnomalyLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setAnomalyError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setAuditFeed: (state, action) => {
            state.auditFeed = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setAnomalyStats: (state, action) => {
            state.stats = action.payload;
        },
        setAnomalyCategoryBreakdown: (state, action) => {
            state.categoryBreakdown = action.payload;
        }
    },
});

export const {
    setAnomalyLoading,
    setAnomalyError,
    setAuditFeed,
    setAnomalyStats,
    setAnomalyCategoryBreakdown
} = anomalySlice.actions;

export default anomalySlice.reducer;


