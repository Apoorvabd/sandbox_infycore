import express from 'express';
import sandboxService from '../services/sandbox.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponse(200, {
            service: 'Mock Banking API',
            status: 'ok'
        }, 'Sandbox API is running')
    );
}));

router.get('/health', asyncHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponse(200, {
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        }, 'Health check passed')
    );
}));

router.get('/institutions', asyncHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponse(200, sandboxService.getInstitutions(), 'Institutions fetched successfully')
    );
}));

router.get('/accounts', asyncHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponse(200, sandboxService.getAccounts(), 'Accounts fetched successfully')
    );
}));

router.get('/accounts/:accountId/transactions', asyncHandler(async (req, res) => {
    const { accountId } = req.params;
    const { start_date: startDate, end_date: endDate } = req.query;

    res.status(200).json(
        new ApiResponse(200, sandboxService.getTransactions({
            accountId,
            startDate,
            endDate
        }), 'Transactions fetched successfully')
    );
}));

router.get('/transactions', asyncHandler(async (req, res) => {
    const { start_date: startDate, end_date: endDate } = req.query;

    res.status(200).json(
        new ApiResponse(200, sandboxService.getTransactions({
            startDate,
            endDate
        }), 'Transactions fetched successfully')
    );
}));

export default router;
