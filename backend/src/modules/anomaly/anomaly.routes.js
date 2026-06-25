import { Router } from "express";

import {
    runDetection,
    getAuditNotifications,
    getAnomalySummary,
    
} from "./anomaly.controller.js";

const router = Router();

router.post(
    "/run",
    runDetection
);

router.get(
    "/audit",
    getAuditNotifications
);

router.get(
    "/stats",
    getAnomalySummary
);


export default router;