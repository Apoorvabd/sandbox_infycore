import { Router } from "express";
import getDashboardSummary from "./dashboardApi.controller.js";

const router = Router();

router.get("/summary", getDashboardSummary);

export default router;