import { pool } from "../../config/db.js";

export const getLargeTransactions = async (
    threshold = 500
) => {

    const result = await pool.query(
        `
        SELECT *
        FROM transactions
        WHERE amount > $1
        `,
        [threshold]
    );

    return result.rows;
};
export const getUncategorizedTransactions =async () => {

    const result = await pool.query(
        `
        SELECT *
        FROM transactions
        WHERE category = 'Uncategorized'
        `
    );

    return result.rows;
};
export const markAsAnomaly = async (
    transactionId,
    reason
) => {

    const result = await pool.query(
        `
        UPDATE transactions
        SET
            is_anomaly = TRUE,
            anomaly_reason = $1
        WHERE id = $2
        RETURNING *
        `,
        [
            reason,
            transactionId
        ]
    );

    return result.rows[0];
};

export const resetAnomalies = async () => {

    await pool.query(`
        UPDATE transactions
        SET
            is_anomaly = FALSE,
            anomaly_reason = NULL
    `);
};

export const getAuditNotifications =async () => {

    const result = await pool.query(
        `
        SELECT
            id,
            raw_merchant,
            normalized_merchant,
            amount,
            category,
            anomaly_reason,
            cleared_date
        FROM transactions
        WHERE is_anomaly = TRUE
        ORDER BY cleared_date DESC
        `
    );

    return result.rows;
};

export const getAnomalyCount = async () => {

    const result = await pool.query(
        `
        SELECT COUNT(*) AS anomaly_count
        FROM transactions
        WHERE is_anomaly = TRUE
        `
    );

    return result.rows[0];
};

export const getPossibleDuplicates = async () => {

    const result = await pool.query(`
        SELECT
            raw_merchant,
            amount,
            ARRAY_AGG(id) AS transaction_ids
        FROM transactions
        GROUP BY
            raw_merchant,
            amount
        HAVING COUNT(*) > 1
    `);

    return result.rows;
};

export const getAnomalyBreakdown = async () => {

    const result = await pool.query(`
        SELECT
            anomaly_reason,
            COUNT(*) as count
        FROM transactions
        WHERE is_anomaly = TRUE
        GROUP BY anomaly_reason
        ORDER BY count DESC
    `);

    return result.rows;
};