import asyncHandler from "../../utils/asycHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
    runAnomalyDetection,
    getAuditFeed,
    getAnomalyStats
} from "./anomaly.service.js";


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
export const runDetection =asyncHandler(async (req, res) => {

    console.time("ANOMALY_DETECTION");

    const result =
        await runAnomalyDetection();

    console.timeEnd(
        "ANOMALY_DETECTION"
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Anomaly detection completed"
        )
    );
});

/**
 * @swagger
 * /anomaly/audit:
 *   get:
 *     summary: Get anomaly audit feed
 *     description: Returns all detected anomalous transactions for manual review.
 *     tags:
 *       - Anomaly
 *     responses:
 *       200:
 *         description: Audit notifications fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data:
 *                 - raw_merchant: DARKWEB SERVICES
 *                   normalized_merchant: DARKWEB SERVICES
 *                   category: Uncategorized
 *                   amount: 450
 *                   anomaly_reason: Unknown Merchant
 *               message: Audit notifications fetched
 *               success: true
 *               errors: []
 */

export const getAuditNotifications = asyncHandler(async (req, res) => {

    const notifications =
        await getAuditFeed();

    return res.status(200).json(
        new ApiResponse(
            200,
            notifications,
            "Audit notifications fetched"
        )
    );
});

/**
 * @swagger
 * /anomaly/stats:
 *   get:
 *     summary: Get anomaly statistics
 *     description: Returns total anomaly count and anomaly breakdown by type.
 *     tags:
 *       - Anomaly
 *     responses:
 *       200:
 *         description: Anomaly statistics fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data:
 *                 total: 10
 *                 breakdown:
 *                   - reason: Unknown Merchant
 *                     count: 8
 *                   - reason: Duplicate Transaction
 *                     count: 2
 *               message: Anomaly stats fetched
 *               success: true
 *               errors: []
 */
export const getAnomalySummary =asyncHandler(async (req, res) => {

    const stats =
        await getAnomalyStats();

    return res.status(200).json(
        new ApiResponse(
            200,
            stats,
            "Anomaly stats fetched"
        )
    );
});


/**
 * @swagger
 * /anomaly/category-breakdown:
 *   get:
 *     summary: Get anomaly category breakdown
 *     description: Returns anomaly counts grouped by transaction category.
 *     tags:
 *       - Anomaly
 *     responses:
 *       200:
 *         description: Category breakdown fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data:
 *                 - category: Uncategorized
 *                   anomaly_count: 8
 *                 - category: Shopping
 *                   anomaly_count: 2
 *               message: Category breakdown fetched
 *               success: true
 *               errors: []
 */
const getCategoryStats =asyncHandler(async (req, res) => {

    const result =
        await categoryBreakdown();

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Category breakdown fetched"
        )
    );
});