import { Router } from "express";
import {getDashboardSummary,getCategoryStats,getCashflow,getRecentTransactionsData} from "./dashboardApi.controller.js";

const router = Router();
router.get( "/categories",getCategoryStats);
router.get("/summary", getDashboardSummary);
router.get(
    "/cashflow",
    getCashflow
);
router.get(
    "/recent_transactions",
    getRecentTransactionsData
);

export default router;