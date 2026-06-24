import { pool } from "../../config/db.js";

export const getTotalAccounts = async () => {

    const result = await pool.query(`
        SELECT COUNT(*) AS total_accounts
        FROM accounts
    `);

    return result.rows[0];
};

export const getTotalBalance = async () => {

    const result = await pool.query(`
        SELECT
            COALESCE(
                SUM(current_balance),
                0
            ) AS total_balance
        FROM accounts
    `);

    return result.rows[0];
};

export const getTotalIncome = async () => {

    const result = await pool.query(`
        SELECT
            COALESCE(
                SUM(amount),
                0
            ) AS total_income
        FROM transactions
        WHERE direction = 'credit'
    `);

    return result.rows[0];
};

export const getTotalExpense = async () => {

    const result = await pool.query(`
        SELECT
            COALESCE(
                SUM(amount),
                0
            ) AS total_expense
        FROM transactions
        WHERE direction = 'debit'
    `);

    return result.rows[0];
};
export const getTotalTransactions = async () => {

    const result = await pool.query(`
        SELECT COUNT(*) AS total_transactions
        FROM transactions
    `);

    return result.rows[0];
};
