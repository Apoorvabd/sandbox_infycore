import { combineReducers } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboard/dashboardSlice.js";

const rootReducer = combineReducers({

    dashboard: dashboardReducer,

});

export default rootReducer;