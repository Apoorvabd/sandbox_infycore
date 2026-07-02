/**
 * @swagger
 * /anomaly/detect:
 *   post:
 *     summary: Run anomaly detection
 *     description: Scans all transactions and detects anomalies such as unknown merchants, duplicate transactions and other suspicious records.
 *     tags:
 *       - Anomaly
 *     responses:
 *       200:
 *         description: Anomaly detection completed successfully
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data:
 *                 detected: 12
 *               message: Anomaly detection completed
 *               success: true
 *               errors: []
 */
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