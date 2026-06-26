import {
    getLedgerTransactions
}
from "./ledger.repository.js";

import {
    getTransactionById,
    getLedgerSummary
}
from "./ledger.repository.js";
export const getTransaction =
async (id) => {

    return await getTransactionById(id);
};
export const ledgerSummary =
async () => {

    return await getLedgerSummary();
};
const getLedger =
async (query) => {

    return await getLedgerTransactions({

        page:
            Number(query.page) || 1,

        limit:
            Number(query.limit) || 10,

        category:
            query.category,

        merchant:
            query.merchant,

        direction:
            query.direction,

        search:
            query.search,

        from:
            query.from,

        to:
            query.to,

        sort:
            query.sort,

        order:
            query.order
    });
};
export default  getLedger ;