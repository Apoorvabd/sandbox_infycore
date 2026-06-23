import axios from 'axios';
import Mock_api from '../../utils/api.js';
import crypto from "crypto";

import {
    findInstitutionById,
    createInstitution,
    findAccountByExternalId,
    createAccount,
    findTransactionByExternalId,
    createTransaction
} from "./ingestion.repository.js";

const runSync = async () => {
    try {
        console.log(process.env.MOCK_SERVER_URL);
        const [institutionsResponse, accountsResponse, transactionsResponse] = await Promise.all([
            axios.get(`${Mock_api}/institutions`),
            axios.get(`${Mock_api}/accounts`),
            axios.get(`${Mock_api}/transactions`)
        ]);
        const stats = {
            institutionsInserted: 0,
            accountsInserted: 0,
            transactionsInserted: 0,
            duplicatesSkipped: 0
        };
        
        const institutions = institutionsResponse.data.data;
        const accounts = accountsResponse.data.data;
        const transactions = transactionsResponse.data.data;
// fetching institutions and inserting them into the database
        for (const institution of institutions) {

        const existingInstitution =
                await findInstitutionById(institution.id);

        if (existingInstitution) {
                stats.duplicatesSkipped++;
                continue;
        }

        await createInstitution({
                id: institution.id,
                name: institution.name
        });

        stats.institutionsInserted++;
    }

// fetching accounts and inserting them into the database

    for (const account of accounts) {

    const existingAccount =
        await findAccountByExternalId(account.accountId);

    if (existingAccount) {
        stats.duplicatesSkipped++;
        continue;
    }

    await createAccount({
        id: crypto.randomUUID(),

        externalAccountId: account.accountId,

        institutionName: account.institutionId,

        accountName: account.accountName,

        accountType: account.accountType,

        currentBalance: account.currentBalance
    });

    stats.accountsInserted++;
}
// fetching transactions and inserting them into the database
    for (const transaction of transactions) {

    const existingTransaction =
        await findTransactionByExternalId(
            transaction.transactionId
        );

    if (existingTransaction) {
        stats.duplicatesSkipped++;
        continue;
    }

    const account =
        await findAccountByExternalId(
            transaction.accountId
        );

    if (!account) {
        console.warn(
            `Account not found: ${transaction.accountId}`
        );
        continue;
    }

    await createTransaction({
        id: crypto.randomUUID(),

        externalTransactionId:
            transaction.transactionId,

        accountId: account.id,

        rawMerchant:
            transaction.rawMerchant,

        amount:
            transaction.amount,

        direction:
            transaction.direction,

        clearedDate:
            transaction.clearedDate
    });

    stats.transactionsInserted++;
}
return stats; 

        console.log('Institutions:', institutions.length);
        console.log('Accounts:', accounts.length);
        console.log('Transactions:', transactions.length);
    } catch (error) {
        console.error('Error occurred while syncing transactions:', error);
        throw error;
    }
};
export default runSync;