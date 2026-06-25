import asyncHandler from "../../utils/asycHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import { getSummary,categoryBreakdown,monthlyCashflow,recentTransactions } from "./dashboardApi.service.js";

export const getDashboardSummary = asyncHandler(async (req, res) => {
    const data = await getSummary();

    return res.status(200).json(
        new ApiResponse(
            200,
            data,
            "Dashboard summary fetched"
        )
    );
});
export const getCategoryStats =asyncHandler(async (req, res) => {

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

export const getCashflow =asyncHandler(async (
    req,
    res
) => {

    const result =
        await monthlyCashflow();

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Monthly cashflow fetched"
        )
    );
});

export const getRecentTransactionsData =asyncHandler(async (req,res) => {

    const limit =
        Number(req.query.limit) || 10;

    const result =
        await recentTransactions(
            limit
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Recent transactions fetched"
        )
    );
});

