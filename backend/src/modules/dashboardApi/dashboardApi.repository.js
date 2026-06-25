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


export const getCategoryBreakdown = async () => {

    const result = await pool.query(`
        SELECT
            category,
            SUM(amount) AS total_amount,
            COUNT(*) AS transaction_count
        FROM transactions
        WHERE direction = 'debit'
        GROUP BY category
        ORDER BY total_amount DESC
    `);

    return result.rows;
};

export const getMonthlyCashflow = async () => {

    const result = await pool.query(`
        SELECT
            TO_CHAR(
                DATE_TRUNC(
                    'month',
                    cleared_date
                ),
                'YYYY-MM'
            ) AS month,

            SUM(
                CASE
                    WHEN direction = 'credit'
                    THEN amount
                    ELSE 0
                END
            ) AS income,

            SUM(
                CASE
                    WHEN direction = 'debit'
                    THEN amount
                    ELSE 0
                END
            ) AS expense

        FROM transactions

        GROUP BY
            DATE_TRUNC(
                'month',
                cleared_date
            )

        ORDER BY
            DATE_TRUNC(
                'month',
                cleared_date
            )
    `);

    return result.rows;
};

export const getRecentTransactions = async (
    limit = 10
) => {

    const result = await pool.query(
        `
        SELECT
            id,
            normalized_merchant,
            category,
            amount,
            direction,
            cleared_date
        FROM transactions
        ORDER BY cleared_date DESC
        LIMIT $1
        `,
        [limit]
    );

    return result.rows;
};
