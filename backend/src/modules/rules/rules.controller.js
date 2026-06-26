import asyncHandler from "../../utils/asycHandler.js";
import {
    getAllRules,
    createRule,
    updateRule,
    deleteRule,
    reprocessTransactions,
    testRule
} from "./rules.service.js";

import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";


/**
 * @swagger
 * /rules:
 *   get:
 *     summary: Get all normalization rules
 *     description: Fetches all merchant normalization rules stored in the database.
 *     tags:
 *       - Rules
 *     responses:
 *       200:
 *         description: Rules fetched successfully
 *       500:
 *         description: Internal Server Error
 */
const getRules = asyncHandler(async (req, res) => {
    try {
        const rules = await getAllRules();

        return res.status(200).json(
            new ApiResponse(200, rules, "Rules fetched successfully")
        );
    } catch (error) {
        throw new ApiError(
            500,
            "Failed to fetch rules",
            [error.message]
        );
    }
});
/**
 * @swagger
 * /rules:
 *   post:
 *     summary: Create Rule
 *     tags:
 *       - Rules
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rule'
 *     responses:
 *       201:
 *         description: Rule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
const CreateRule = asyncHandler(async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new ApiError(400, "Request body cannot be empty");
        }

        const rule = await createRule(req.body);

        return res.status(201).json(
            new ApiResponse(201, rule, "Rule created successfully")
        );
    } catch (error) {
        throw new ApiError(
            error.statusCode || 500,
            error.message || "Failed to create rule",
            error.errors || []
        );
    }
});
/**
 * @swagger
 * /rules/{id}:
 *   put:
 *     summary: Update a normalization rule
 *     description: Updates an existing normalization rule by ID.
 *     tags:
 *       - Rules
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             keyword: amazon
 *             clean_merchant_name: Amazon
 *             target_category: Shopping
 *     responses:
 *       200:
 *         description: Rule updated successfully
 *       404:
 *         description: Rule not found
 */
const UpdateRule = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new ApiError(400, "Rule ID is required");
        }

        const rule = await updateRule(id, req.body);

        if (!rule) {
            throw new ApiError(404, "Rule not found or update failed");
        }

        return res.status(200).json(
            new ApiResponse(200, rule, "Rule updated successfully")
        );
    } catch (error) {
        throw new ApiError(
            error.statusCode || 500,
            error.message || "Failed to update rule",
            error.errors || []
        );
    }
});
/**
 * @swagger
 * /rules/{id}:
 *   delete:
 *     summary: Delete a normalization rule
 *     description: Deletes a rule using its ID.
 *     tags:
 *       - Rules
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rule deleted successfully
 *       404:
 *         description: Rule not found
 */
const DeleteRule = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new ApiError(400, "Rule ID is required");
        }

        const rule = await deleteRule(id);

        if (!rule) {
            throw new ApiError(404, "Rule not found or already deleted");
        }

        return res.status(200).json(
            new ApiResponse(200, rule, "Rule deleted successfully")
        );
    } catch (error) {
        throw new ApiError(
            error.statusCode || 500,
            error.message || "Failed to delete rule",
            error.errors || []
        );
    }
});
/**
 * @swagger
 * /rules/reprocess:
 *   post:
 *     summary: Reprocess all transactions
 *     description: Re-runs the ETL normalization process using the latest rules.
 *     tags:
 *       - Rules
 *     responses:
 *       200:
 *         description: Transactions reprocessed successfully
 *       500:
 *         description: Failed to reprocess transactions
 */
const reprocess = asyncHandler(async (req, res) => {
    try {
        console.time("REPROCESS");

        const result = await reprocessTransactions();

        console.timeEnd("REPROCESS");

        if (!result) {
            throw new ApiError(500, "Reprocessing failed, no result returned");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Transactions reprocessed successfully"
            )
        );
    } catch (error) {
        console.timeEnd("REPROCESS");

        throw new ApiError(
            error.statusCode || 500,
            error.message || "Failed to reprocess transactions",
            error.errors || []
        );
    }
});
/**
 * @swagger
 * /rules/test:
 *   post:
 *     summary: Test merchant normalization
 *     description: Tests how a merchant name would be normalized without saving anything to the database.
 *     tags:
 *       - Rules
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             rawMerchant: AMZN Mktp US*HJ291
 *     responses:
 *       200:
 *         description: Rule tested successfully
 *       400:
 *         description: Invalid input
 */
const testRuleController =asyncHandler(async (req,res) => {
    const { merchant } =
        req.body;

    const result = await testRule(merchant);

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Rule tested successfully"
        )
    );
});

export {
    getRules,
    CreateRule,
    UpdateRule,
    DeleteRule,
    reprocess,
    testRuleController
};