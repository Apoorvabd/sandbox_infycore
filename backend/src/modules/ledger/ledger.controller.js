

import getLedger from "./ledger.service.js";
import asyncHandler from "../../utils/asycHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/apiError.js";
import { getTransaction, ledgerSummary } from "./ledger.service.js";
/**
 * @swagger
 * /ledger:
 *   get:
 *     summary: Get ledger transactions
 *     description: Returns processed ledger transactions with filtering, searching, sorting and pagination.
 *     tags:
 *       - Ledger
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         example: Food
 *
 *       - in: query
 *         name: merchant
 *         schema:
 *           type: string
 *         example: Amazon
 *
 *       - in: query
 *         name: direction
 *         schema:
 *           type: string
 *         example: debit
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: starbucks
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         example: amount
 *
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         example: DESC
 *
 *     responses:
 *       200:
 *         description: Ledger fetched successfully
 */

export const getLedgerController = asyncHandler(async (
    req,
    res
) => {
try{
    const data =
        await getLedger(
            req.query
        );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                data,
                "Ledger fetched successfully"
            )
        );
    }
catch(error){
        console.log("Error fetching ledger:", error);
        throw new ApiError(500, "Error fetching ledger");
    }
});

/**
 * @swagger
 * /ledger/{id}:
 *   get:
 *     summary: Get transaction by id
 *     tags:
 *       - Ledger
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction fetched successfully
 */
export const getTransactionController =asyncHandler(async (
    req,
    res
) => {

    const transaction =
        await getTransaction(
            req.params.id
        );

    if (!transaction) {

        throw new ApiError(
            404,
            "Transaction not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            transaction,
            "Transaction fetched successfully"
        )
    );
});

/**
 * @swagger
 * /ledger/summary:
 *   get:
 *     summary: Get ledger summary
 *     tags:
 *       - Ledger
 *     responses:
 *       200:
 *         description: Ledger summary fetched successfully
 */
export const getLedgerSummaryController = asyncHandler(async (
    req,
    res
) => {

    const summary =await ledgerSummary();

    return res.status(200).json(
        new ApiResponse(
            200,
            summary,
            "Ledger summary fetched successfully"
        )
    );
});

