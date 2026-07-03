  /**
 * @swagger
 * /ingestion/sync:
 *   post:
 *     summary: Sync transactions from mock source
 *     description: Fetches transaction data from the mock API, applies normalization rules, and stores processed transactions in the database.
 *     tags:
 *       - Ingestion
 *     responses:
 *       200:
 *         description: Transactions synced successfully
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data:
 *                 processed: 120
 *               message: Transactions synced successfully
 *               success: true
 *               errors: []
 *       500:
 *         description: Failed to sync transactions
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 500
 *               data: null
 *               message: Failed to sync transactions
 *               success: false
 *               errors: []
 */

import asyncHandler from "../../utils/asycHandler.js";
import runSync from "./ingestion.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";

const syncTransactions = asyncHandler(async (req, res) => {
   try{
    const result=await runSync();

    return res.status(200).json(
        new ApiResponse(200, result, "Transactions synced successfully")
    );
}
    catch (error) {
        throw new ApiError(
            error.statusCode || 500,
            error.message || "Failed to sync transactions",
            error.errors || []
        );
    }   
});
export default  syncTransactions;