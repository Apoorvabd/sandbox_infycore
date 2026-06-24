import asyncHandler from "../../utils/asycHandler.js";
import {
    getAllRules,
    createRule,
    updateRule,
    deleteRule,
    reprocessTransactions
} from "./rules.service.js";

import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";

/**
 * GET ALL RULES
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
 * CREATE RULE
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
 * UPDATE RULE
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
 * DELETE RULE
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
 * REPROCESS TRANSACTIONS
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

export {
    getRules,
    CreateRule,
    UpdateRule,
    DeleteRule,
    reprocess
};