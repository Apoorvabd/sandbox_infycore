import { pool } from "../../config/db.js";
import { v4 as uuidv4 } from "uuid";



// GET ALL RULES
export const getRulesFromDB = async () => {

    const result = await pool.query(`
        SELECT *
        FROM classification_rules
        ORDER BY created_at DESC
    `);

    return result.rows;
};

// CREATE RULE
export const createRuleInDB = async (ruleData) => {
    const {
        keyword,
        target_category,
        clean_merchant_name
    } = ruleData;

    const id = uuidv4(); // it is to create a unique identifier for the new rule

    const result = await pool.query(
        `
        INSERT INTO classification_rules (
            id,
            keyword,
            target_category,
            clean_merchant_name
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
            id,
            keyword,
            target_category,
            clean_merchant_name
        ]
    );

    return result.rows[0];
};
// UPDATE RULE
export const updateRuleInDB = async (
    ruleId,
    ruleData
) => {

    const {
        keyword,
        target_category,
        clean_merchant_name
    } = ruleData;

    const result = await pool.query(
        `
        UPDATE classification_rules
        SET
            keyword = $1,
            target_category = $2,
            clean_merchant_name = $3
        WHERE id = $4
        RETURNING *
        `,
        [
            keyword,
            target_category,
            clean_merchant_name,
            ruleId
        ]
    );

    return result.rows[0] || null;
};

// DELETE RULE
export const deleteRuleFromDB = async (
    ruleId
) => {

    const result = await pool.query(
        `
        DELETE FROM classification_rules
        WHERE id = $1
        RETURNING *
        `,
        [ruleId]
    );

    return result.rows[0] || null;
};