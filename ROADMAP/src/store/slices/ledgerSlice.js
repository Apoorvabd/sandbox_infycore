import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactions: [],
    totalCount: 0,
    summary: null,
    isLoading: false,
    error: null,
    filters: {
        page: 1,
        limit: 10,
        search: "",
        category: "",
        merchant: "",
        direction: "",
        sort: "cleared_date",
        order: "DESC",
    },
};

const ledgerSlice = createSlice({
    name: "ledger",
    initialState,
    reducers: {
        setLedgerLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setLedgerError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setTransactions: (state, action) => {
            state.transactions = action.payload.data;
            state.totalCount = action.payload.totalCount;
            state.isLoading = false;
            state.error = null;
        },
        setLedgerSummary: (state, action) => {
            state.summary = action.payload;
        },
        updateFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            // Reset to page 1 on filter change, unless we explicitly passed a page update
            if (!action.payload.page) {
               state.filters.page = 1;
            }
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
        }
    },
});

export const {
    setLedgerLoading,
    setLedgerError,
    setTransactions,
    setLedgerSummary,
    updateFilters,
    resetFilters,
} = ledgerSlice.actions;

export default ledgerSlice.reducer;
