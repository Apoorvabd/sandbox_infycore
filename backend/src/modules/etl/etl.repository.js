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
    updates
) => {
    if(updates.length === 0){
        return;
    }
    let palceholders = [];
    let values = [];
    let idx=1;
    for(const update of updates){
        palceholders.push(`($${idx++},$${idx++},$${idx++})`);
        values.push(update.id,update.normalizedMerchant,update.category);
    }
    console.log(updates.length);
console.log(values);
   const result =await pool.query (
        
        `UPDATE transactions AS t
        SET
            normalized_merchant = v.normalized_merchant,
            category = v.category,
            processed = TRUE
        FROM (
            VALUES
            ${palceholders.join(",")}
        ) AS v(
            id,
            normalized_merchant,
            category
        )
       WHERE t.id = v.id::uuid
        `,
        values
    );
    return result.rows[0];

};

export const resetProcessedTransactions = async () => {

    await pool.query(`
        UPDATE transactions
        SET
            processed = false,
            normalized_merchant = NULL,
            category = NULL
    `);
};


export default { getAllRules, getUnprocessedTransactions, updateProcessedTransaction , resetProcessedTransactions };
