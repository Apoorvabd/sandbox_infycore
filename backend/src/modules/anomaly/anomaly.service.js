import {
    getLargeTransactions,
    getUncategorizedTransactions,
    getPossibleDuplicates,
    markAsAnomaly,
    resetAnomalies,
    getAuditNotifications,
    getAnomalyCount,
    getAnomalyBreakdown
} from "./anomaly.repository.js";
import ApiError from "../../utils/ApiError.js";

export const runAnomalyDetection = async () => {
try{
    await resetAnomalies();
}catch (error) {
    throw new ApiError(500, "Failed to reset anomalies");
}
    const stats = {
        largeTransactions: 0,
        uncategorized: 0,
        duplicates: 0
    };


    // -------------------------
    // Uncategorized
    // -------------------------
    try{
         const uncategorizedTransactions =
        await getUncategorizedTransactions();
     }catch (error) {
        throw new ApiError(500, "Failed to fetch uncategorized transactions");
    }

    for (const transaction of uncategorizedTransactions) {

        await markAsAnomaly(transaction.id,"Unknown Merchant");

        stats.uncategorized++;
    }

    // -------------------------
    // Duplicates
    // -------------------------

    const duplicateGroups =
        await getPossibleDuplicates();

    for (const group of duplicateGroups) {

        for (const transactionId of group.transaction_ids) {

            await markAsAnomaly(
                transactionId,
                "Duplicate Transaction"
            );

            stats.duplicates++;
        }
    }

    // -------------------------
    // Large Transactions
    // -------------------------

    const largeTransactions =
        await getLargeTransactions(100);

    for (const transaction of largeTransactions) {

        await markAsAnomaly(
            transaction.id,
            "Large Transaction"
        );

        stats.largeTransactions++;
    }

    return stats;
};
    
export const getAuditFeed =async () => {

    return await getAuditNotifications();
};

export const getAnomalyStats =async () => {
    const count = await getAnomalyCount();
    const breakdown = await getAnomalyBreakdown();

    const data = {
        totalAnomalies: Number(count.anomaly_count),
        breakdown: breakdown.map(item => ({
            reason: item.anomaly_reason,
            count: Number(item.count)
        }))
    };



    return data;
};