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