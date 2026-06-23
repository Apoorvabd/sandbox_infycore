import asyncHandler from "../../utils/asycHandler.js";
import runSync from "./ingestion.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

const syncTransactions = asyncHandler(async (req, res) => {

    const result=await runSync();

    return res.status(200).json(
        new ApiResponse(200, result, "Transactions synced successfully")
    );
});
export default  syncTransactions;