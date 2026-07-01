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

    const [
        institutionsResponse,
        accountsResponse,
        transactionsResponse
    ] = await Promise.all([
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


    // =====================================
    // INSTITUTIONS
    // =====================================

    console.log("INSTITUTIONS_INSERT");

    stats.institutionsInserted =
        await createInstitutionsBulk(
            institutions
        );

    console.timeEnd("INSTITUTIONS_INSERT");

    // =====================================
    // ACCOUNTS PREPARE
    // =====================================

    console.time("ACCOUNT_TRANSFORM");

    const accountsToInsert =
        accounts.map(account => ({
            id: crypto.randomUUID(),

            externalAccountId:
                account.accountId,

            institutionName:
                account.institutionId,

            accountName:
                account.accountName,

            accountType:
                account.accountType,

            currentBalance:
                account.currentBalance
        }));

    console.timeEnd("ACCOUNT_TRANSFORM");

    // =====================================
    // ACCOUNTS INSERT
    // =====================================

    console.time("ACCOUNT_INSERT");

    stats.accountsInserted =
        await createAccountsBulk(
            accountsToInsert
        );

    console.timeEnd("ACCOUNT_INSERT");

    // =====================================
    // LOAD ACCOUNT MAP
    // =====================================

    console.time("ACCOUNT_MAP_FETCH");

    const dbAccounts =
        await getAllAccounts();

    console.timeEnd("ACCOUNT_MAP_FETCH");

    console.time("ACCOUNT_MAP_BUILD");

    const accountMap = new Map();

    for (const account of dbAccounts) {

        accountMap.set(
            account.external_account_id,
            account.id
        );
    }

    console.timeEnd("ACCOUNT_MAP_BUILD");

    // =====================================
    // TRANSACTION TRANSFORM
    // =====================================

    console.time("TRANSACTION_TRANSFORM");

    const transactionsToInsert = [];

    for (const transaction of transactions) {

        const accountId =
            accountMap.get(
                transaction.accountId
            );

        if (!accountId) {
            continue;
        }

        transactionsToInsert.push({
            id: crypto.randomUUID(),

            externalTransactionId:
                transaction.transactionId,

            accountId,

            rawMerchant:
                transaction.rawMerchant,

            amount:
                transaction.amount,

            direction:
                transaction.direction,

            clearedDate:
                transaction.clearedDate
        });
    }

    console.timeEnd("TRANSACTION_TRANSFORM");

    // =====================================
    // TRANSACTION INSERT
    // =====================================

    console.time("TRANSACTION_INSERT");

    stats.transactionsInserted =
        await createTransactionsBulk(
            transactionsToInsert
        );

    console.timeEnd("TRANSACTION_INSERT");

    // =====================================
    // ETL
    // =====================================

    console.log("Starting ETL process...");
try{
    const etlResult =
        await processTransactions();


    // =====================================
    // TOTAL
    // =====================================


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