import {
    getAllRules,
    getUnprocessedTransactions,
    updateProcessedTransaction
} from "./etl.repository.js";

export const processTransactions = async () => {

    const rules = await getAllRules();

    const transactions =
        await getUnprocessedTransactions();

    const stats = {
        processed: 0,
        categorized: 0,
        uncategorized: 0
    };

    for (const transaction of transactions) {

        let normalizedMerchant =
            transaction.raw_merchant;

        let category =
            "Uncategorized";

        // Rule Matching
        for (const rule of rules) {

            const regex = new RegExp(
                rule.keyword,
                "i"
            );

            if (
                regex.test(
                    transaction.raw_merchant
                )
            ) {

                normalizedMerchant =
                    rule.clean_merchant_name;

                category =
                    rule.target_category;

                stats.categorized++;

                break;
            }
        }

        if (
            category === "Uncategorized"
        ) {
            stats.uncategorized++;
        }

        await updateProcessedTransaction(
            transaction.id,
            normalizedMerchant,
            category
        );

        stats.processed++;
    }

    return stats;
};

export default processTransactions;
