import { pool } from "../../config/db.js";

export const getAllRules = async () => {

    const result = await pool.query(`
        SELECT *
        FROM classification_rules
    `);

    return result.rows;
};

export const getUnprocessedTransactions = async () => {
    const result = await pool.query(`
        SELECT *
        FROM transactions
        WHERE processed = FALSE
    `);

    return result.rows;
};

export const updateProcessedTransaction = async (
    transactionId,
    normalizedMerchant,
    category
) => {

    const result = await pool.query(
        `
        UPDATE transactions
        SET
            normalized_merchant = $1,
            category = $2,
            processed = TRUE
        WHERE id = $3
        RETURNING *
        `,
        [
            normalizedMerchant,
            category,
            transactionId
        ]
    );

    return result.rows[0];
};
export default { getAllRules, getUnprocessedTransactions, updateProcessedTransaction };
