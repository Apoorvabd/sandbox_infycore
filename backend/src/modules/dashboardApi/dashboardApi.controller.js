import asyncHandler from "../../utils/asycHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import { getSummary } from "./dashboardApi.service.js";

const getDashboardSummary = asyncHandler(async (req, res) => {
    const data = await getSummary();

    return res.status(200).json(
        new ApiResponse(
            200,
            data,
            "Dashboard summary fetched"
        )
    );
});

export default getDashboardSummary;

