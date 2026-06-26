import asyncHandler from "../../utils/asycHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import { getSummary,categoryBreakdown,monthlyCashflow,recentTransactions } from "./dashboardApi.service.js";
/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     description: Returns overall statistics including total accounts, current balance, income, expense and transactions.
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Dashboard summary fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data:
 *                 total_accounts: 5
 *                 total_balance: 15500
 *                 total_income: 21000
 *                 total_expense: 5500
 *                 total_transactions: 46
 *               message: Dashboard summary fetched
 *               success: true
 *               errors: []
 */
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
/**
 * @swagger
 * /dashboard/category-breakdown:
 *   get:
 *     summary: Get expense breakdown by category
 *     description: Returns the number of transactions and total amount grouped by category.
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Category breakdown fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data:
 *                 - category: Shopping
 *                   transaction_count: 5
 *                   total_amount: 1113.99
 *                 - category: Food
 *                   transaction_count: 8
 *                   total_amount: 95.30
 *               message: Category breakdown fetched
 *               success: true
 *               errors: []
 */
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
/**
 * @swagger
 * /dashboard/monthly-cashflow:
 *   get:
 *     summary: Get monthly cashflow
 *     description: Returns monthly income and expense totals for visualization.
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Monthly cashflow fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data:
 *                 - month: 2026-04
 *                   income: 9522
 *                   expense: 183.53
 *                 - month: 2026-05
 *                   income: 9520
 *                   expense: 1160.23
 *               message: Monthly cashflow fetched
 *               success: true
 *               errors: []
 */
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
/**
 * @swagger
 * /dashboard/recent-transactions:
 *   get:
 *     summary: Get recent transactions
 *     description: Returns the most recent transactions. Limit can be passed as a query parameter.
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of recent transactions to return.
 *     responses:
 *       200:
 *         description: Recent transactions fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data:
 *                 - normalized_merchant: Amazon
 *                   category: Shopping
 *                   amount: 114.99
 *                   direction: debit
 *                   cleared_date: "2026-06-15"
 *               message: Recent transactions fetched
 *               success: true
 *               errors: []
 */
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

