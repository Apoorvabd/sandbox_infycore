import axios from "axios";
import crypto from "crypto";

import Mock_api from "../../utils/api.js";
import { processTransactions } from "../etl/etl.service.js";

import {
    getAllAccounts,
    createTransactionsBulk,
    createAccountsBulk,
    createInstitutionsBulk
} from "./ingestion.repository.js";

const runSync = async () => {

    

    // =====================================
    // FETCH DATA
    // =====================================

    const [ institutionsResponse, accountsResponse, transactionsResponse ]= await Promise.all([ 
        axios.get(`${Mock_api}/institutions`), 
        axios.get(`${Mock_api}/accounts`), 
        axios.get(`${Mock_api}/transactions`)
    ]);
    const institutions = institutionsResponse.data.data;
    const accounts = accountsResponse.data.data;
    const transactions = transactionsResponse.data.data;
    let stats = {
        institutionsInserted: 0,
        accountsInserted: 0,
        transactionsInserted: 0
    };

    stats.institutionsInserted =await createInstitutionsBulk( institutions );


    const accountsToInsert =
        accounts.map(account => ({
            id: crypto.randomUUID(),
             externalAccountId:    account.accountId,
             institutionName:    account.institutionId,
             accountName:    account.accountName,
             accountType:    account.accountType,
             currentBalance:    account.currentBalance
        }));

    

    stats.accountsInserted =
        await createAccountsBulk(
            accountsToInsert
        );
    const dbAccounts =      await getAllAccounts();
    const accountMap = new Map();

    for (const account of dbAccounts) {
      accountMap.set(account.external_account_id, account.id );
    }

    const transactionsToInsert = [];

    for (const transaction of transactions) {

        const accountId = accountMap.get(transaction.accountId  );

        if (!accountId) {
            continue;
        }

        transactionsToInsert.push({
            id: crypto.randomUUID(),

            externalTransactionId: transaction.transactionId,

            accountId,

            rawMerchant: transaction.rawMerchant,

            amount: transaction.amount,

            direction: transaction.direction,

            clearedDate: transaction.clearedDate
        });
    }

    stats.transactionsInserted = await createTransactionsBulk(             transactionsToInsert );

try{
    const etlResult =
        await processTransactions();
        console.log("ETL Result:", etlResult);
    return {
        ...stats,
        etl: etlResult
    };
}
catch(error){
    console.error("Error during ETL process:", error);
    throw error;
}
};

export default runSync;