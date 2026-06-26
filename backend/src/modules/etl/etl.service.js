import {
    getAllRules,
    getUnprocessedTransactions,
    updateProcessedTransaction
} from "./etl.repository.js";

import { normalizeMerchant } from "./normalizer/merchant.normalizer.js";

// export const processTransactions = async () => {

//     const rules = await getAllRules();
//     const transactions = await getUnprocessedTransactions();
//     const stats = {
//         processed: 0,
//         categorized: 0,
//         uncategorized: 0
//     };

//     for (const transaction of transactions) {

//         const result =
//             normalizeMerchant(
//                 transaction.raw_merchant,
//                 rules
//             );

//         if (result.category === "Uncategorized") {
//             stats.uncategorized++;
//         } 
//         else {
//             stats.categorized++;
//         }

//         await updateProcessedTransaction(
//             transaction.id,
//             result.normalizedMerchant,
//             result.category
//         );

//         stats.processed++;
//     }

//     return stats;
// };

export const processTransactions = async () => {
    const rules=await getAllRules();
    const transactions=await getUnprocessedTransactions();
    const stats={
        processed:0,
        categorized:0,
        uncategorized:0
    };
    const updates=[];
    for(const transaction of transactions){
    const result=normalizeMerchant(transaction.raw_merchant,rules);
    if(result.category==="Uncategorized"){
        stats.uncategorized++;
    }
    else{
        stats.categorized++;
    }
    updates.push({
        id:transaction.id,
        normalizedMerchant:result.normalizedMerchant,
        category:result.category
    });
    stats.processed++;
    }
    await updateProcessedTransaction(updates);
    return stats;
}

