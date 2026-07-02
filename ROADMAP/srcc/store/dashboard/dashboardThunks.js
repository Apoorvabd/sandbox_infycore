// fetchSummary()

// fetchCategories()

// fetchCashflow()

// fetchRecentTransactions()

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardSummary } from "../../features/dashboard/dashboard.api.js";

export const fetchDashboardSummary = createAsyncThunk(
    "dashboard/fetchSummary",

    async (_, { rejectWithValue }) => {

        try {
            const data = await getDashboardSummary();
            console.log("Response :", data);
            return data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.message);
        }

    }
);