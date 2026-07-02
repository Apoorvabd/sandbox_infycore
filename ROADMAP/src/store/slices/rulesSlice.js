import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rules: [],
    isLoading: false,
    error: null,
};

const rulesSlice = createSlice({
    name: "rules",
    initialState,
    reducers: {
        setRulesLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setRulesError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setRules: (state, action) => {
            state.rules = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        addRule: (state, action) => {
            state.rules.push(action.payload);
        },
        updateRuleInState: (state, action) => {
            const index = state.rules.findIndex(r => r.id === action.payload.id);
            if (index !== -1) {
                state.rules[index] = action.payload;
            }
        },
        removeRule: (state, action) => {
            state.rules = state.rules.filter(r => r.id !== action.payload);
        }
    },
});

export const {
    setRulesLoading,
    setRulesError,
    setRules,
    addRule,
    updateRuleInState,
    removeRule
} = rulesSlice.actions;

export default rulesSlice.reducer;
