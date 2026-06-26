import { pool } from "../../config/db.js";

export const getLedgerTransactions = async ({
    page = 1,
    limit = 10,
    category,
    merchant,
    direction,
    search,
    from,
    to,
    sort = "cleared_date",
    order = "DESC"
}) => {

    const values = [];
    const conditions = [];

    // ----------------------------
    // Filters
    // ----------------------------

    if (category) {
        values.push(category);
        conditions.push(
            `category = $${values.length}`
        );
    }

    if (merchant) {
        values.push(`%${merchant}%`);
        conditions.push(
            `normalized_merchant ILIKE $${values.length}`
        );
    }

    if (direction) {
        values.push(direction);
        conditions.push(
            `direction = $${values.length}`
        );
    }

    if (search) {

        values.push(`%${search}%`);

        conditions.push(`
            (
                normalized_merchant ILIKE $${values.length}
                OR
                raw_merchant ILIKE $${values.length}
                OR
                category ILIKE $${values.length}
            )
        `);
    }

    if (from) {

        values.push(from);

        conditions.push(
            `cleared_date >= $${values.length}`
        );
    }

    if (to) {

        values.push(to);

        conditions.push(
            `cleared_date <= $${values.length}`
        );
    }

    const whereClause =
        conditions.length
            ? `WHERE ${conditions.join(" AND ")}`
            : "";

    // ----------------------------
    // Sort Validation
    // ----------------------------

    const allowedSortFields = [
        "amount",
        "cleared_date",
        "category",
        "normalized_merchant"
    ];

    if (
        !allowedSortFields.includes(sort)
    ) {
        sort = "cleared_date";
    }

    order =
        order.toUpperCase() === "ASC"
            ? "ASC"
            : "DESC";

    // ----------------------------
    // Total Count
    // ----------------------------

    const countQuery = `
        SELECT COUNT(*) AS total
        FROM transactions
        ${whereClause}
    `;

    const countResult =
        await pool.query(
            countQuery,
            values
        );

    const total =
        Number(
            countResult.rows[0].total
        );

    // ----------------------------
    // Pagination
    // ----------------------------

    const offset =
        (page - 1) * limit;

    values.push(limit);
    values.push(offset);

    // ----------------------------
    // Main Query
    // ----------------------------

    const query = `
        SELECT
            id,
            raw_merchant,
            normalized_merchant,
            category,
            amount,
            direction,
            cleared_date,
            is_anomaly,
            anomaly_reason

        FROM transactions

        ${whereClause}

        ORDER BY
            ${sort} ${order}

        LIMIT $${values.length - 1}
        OFFSET $${values.length}
    `;

    const result =
        await pool.query(
            query,
            values
        );

    return {
        transactions:
            result.rows,

        pagination: {

            total,

            page,

            limit,

            totalPages:
                Math.ceil(
                    total / limit
                )
        }
    };
};

export const getTransactionById = async (
    id
) => {

    const result = await pool.query(
        `
        SELECT
            id,
            account_id,
            raw_merchant,
            normalized_merchant,
            category,
            amount,
            direction,
            cleared_date,
            is_anomaly,
            anomaly_reason
        FROM transactions
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};

export const getLedgerSummary = async () => {

    const result = await pool.query(`
        SELECT

            COUNT(*) AS total_transactions,

            COUNT(*) FILTER (
                WHERE direction='credit'
            ) AS total_credits,

            COUNT(*) FILTER (
                WHERE direction='debit'
            ) AS total_debits,

            COALESCE(
                SUM(amount),
                0
            ) AS total_amount,

            COALESCE(
                SUM(amount)
                FILTER (
                    WHERE direction='credit'
                ),
                0
            ) AS total_credit_amount,

            COALESCE(
                SUM(amount)
                FILTER (
                    WHERE direction='debit'
                ),
                0
            ) AS total_debit_amount

        FROM transactions;
    `);

    return result.rows[0];
};