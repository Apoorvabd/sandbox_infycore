import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarOpen: true,
    theme: "dark", // We use dark slate theme by default
    globalLoading: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        },
        setGlobalLoading: (state, action) => {
            state.globalLoading = action.payload;
        },
        // For future theme switching if needed
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});

export const { toggleSidebar, setSidebarOpen, setGlobalLoading, setTheme } = uiSlice.actions;

export default uiSlice.reducer;
