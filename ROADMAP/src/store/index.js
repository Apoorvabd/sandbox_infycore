import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import dashboardReducer from "./slices/dashboardSlice";
import ledgerReducer from "./slices/ledgerSlice";
import rulesReducer from "./slices/rulesSlice";
import anomalyReducer from "./slices/anomalySlice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        dashboard: dashboardReducer,
        ledger: ledgerReducer,
        rules: rulesReducer,
        anomaly: anomalyReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disabling serializable check for large transaction lists if needed, though best to keep on unless strict issues occur.
        }),
});

export default store;