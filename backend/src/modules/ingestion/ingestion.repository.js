import { pool } from "../../config/db.js";

export const findInstitutionById = async (institutionId) => {
    const result = await pool.query(
        `
        SELECT *
        FROM institutions
        WHERE id = $1
        `,
        [institutionId]
    );

    return result.rows[0] || null;
};

export const createInstitution = async (institution) => {
    const result = await pool.query(
        `
        INSERT INTO institutions (
            id,
            name
        )
        VALUES (
            $1,
            $2
        )
        RETURNING *
        `,
        [
            institution.id,
            institution.name
        ]
    );

    return result.rows[0];
};

export const findAccountByExternalId = async (externalAccountId) => {
    const result = await pool.query(
        `
        SELECT *
        FROM accounts
        WHERE external_account_id = $1
        `,
        [externalAccountId]
    );

    return result.rows[0] || null;
};

export const createAccount = async (account) => {
    const result = await pool.query(
        `
        INSERT INTO accounts (
            id,
            external_account_id,
            institution_name,
            account_name,
            account_type,
            current_balance
        )
        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
        )
        RETURNING *
        `,
        [
            account.id,
            account.externalAccountId,
            account.institutionName,
            account.accountName,
            account.accountType,
            account.currentBalance
        ]
    );

    return result.rows[0];
};

export const findTransactionByExternalId = async (externalTransactionId) => {
    const result = await pool.query(
        `
        SELECT *
        FROM transactions
        WHERE external_transaction_id = $1
        `,
        [externalTransactionId]
    );

    return result.rows[0] || null;
};

export const createTransaction = async (transaction) => {
    const result = await pool.query(
        `
        INSERT INTO transactions (
            id,
            external_transaction_id,
            account_id,
            raw_merchant,
            amount,
            direction,
            cleared_date
        )
        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
        )
        RETURNING *
        `,
        [
            transaction.id,
            transaction.externalTransactionId,
            transaction.accountId,
            transaction.rawMerchant,
            transaction.amount,
            transaction.direction,
            transaction.clearedDate
        ]
    );

    return result.rows[0];
};