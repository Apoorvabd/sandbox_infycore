import { pool } from "../../config/db.js";

export const createInstitution = async (institution) => {
    const result = await pool.query(
        `
        INSERT INTO institutions (
            id,
            name
        )
        VALUES ($1, $2)
        ON CONFLICT (id)
        DO NOTHING
        RETURNING *
        `,
        [
            institution.id,
            institution.name
        ]
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
        VALUES ($1,$2,$3,$4,$5,$6)
        ON CONFLICT (external_account_id)
        DO NOTHING
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
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        ON CONFLICT (external_transaction_id)
        DO NOTHING
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

    return result.rows[0] || null;
};

export const getAllAccounts = async () => {
    const result = await pool.query(`
        SELECT id, external_account_id
        FROM accounts
    `);

    return result.rows;
};

export const createTransactionsBulk = async (
    transactions
) => {

    if (!transactions.length) {
        return 0;
    }

    const values = [];
    const placeholders = [];

    let index = 1;

    for (const tx of transactions) {

        placeholders.push(
            `(
                $${index++},
                $${index++},
                $${index++},
                $${index++},
                $${index++},
                $${index++},
                $${index++}
            )`
        );

        values.push(
            tx.id,
            tx.externalTransactionId,
            tx.accountId,
            tx.rawMerchant,
            tx.amount,
            tx.direction,
            tx.clearedDate
        );
    }

    const query = `
        INSERT INTO transactions (
            id,
            external_transaction_id,
            account_id,
            raw_merchant,
            amount,
            direction,
            cleared_date
        )
        VALUES
        ${placeholders.join(",")}
        ON CONFLICT (external_transaction_id)
        DO NOTHING
    `;

    await pool.query(query, values);

    return transactions.length;
};

export const createInstitutionsBulk = async (
    institutions
) => {

    if (!institutions.length) return;

    const values = [];
    const placeholders = [];

    let idx = 1;

    for (const institution of institutions) {

        placeholders.push(
            `($${idx++}, $${idx++})`
        );

        values.push(
            institution.id,
            institution.name
        );
    }

    await pool.query(
        `
        INSERT INTO institutions (
            id,
            name
        )
        VALUES
        ${placeholders.join(",")}
        ON CONFLICT (id)
        DO NOTHING
        `,
        values
    );
};

export const createAccountsBulk = async (accounts) => {

    if (!accounts.length) {
        return;
    }

    const values = [];
    const placeholders = [];

    let idx = 1;

    for (const account of accounts) {

        placeholders.push(
            `(
                $${idx++},
                $${idx++},
                $${idx++},
                $${idx++},
                $${idx++},
                $${idx++}
            )`
        );

        values.push(
            account.id,
            account.externalAccountId,
            account.institutionName,
            account.accountName,
            account.accountType,
            account.currentBalance
        );
    }

    const query = `
        INSERT INTO accounts (
            id,
            external_account_id,
            institution_name,
            account_name,
            account_type,
            current_balance
        )
        VALUES
        ${placeholders.join(",")}
        ON CONFLICT (external_account_id)
        DO NOTHING
    `;

    await pool.query(query, values);

    return accounts.length;
};