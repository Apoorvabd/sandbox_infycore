import asyncHandler from "../../utils/asycHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
    runAnomalyDetection,
    getAuditFeed,
    getAnomalyStats
} from "./anomaly.service.js";

// ----------------------------------
// Run Detection
// ----------------------------------

export const runDetection =
asyncHandler(async (req, res) => {

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

// ----------------------------------
// Audit Feed
// ----------------------------------

export const getAuditNotifications =
asyncHandler(async (req, res) => {

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

// ----------------------------------
// Dashboard Stats
// ----------------------------------

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


//category stats here 
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