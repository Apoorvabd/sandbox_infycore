import accounts from '../data/accounts.js';
import transactions from '../data/transactions.js';
import institutions from '../data/institutions.js';
import ApiError from '../utils/ApiError.js';

function getAccounts() {
  return accounts;
};

function getAccountById(accountId) {
    return accounts.find((account) => account.accountId === accountId);
}

const isValidDate = (dateValue) => {
    if (!dateValue) {
        return true;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
        return false;
    }

    const date = new Date(dateValue);

    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateValue;
};

const getTransactions = ({ accountId, startDate, endDate } = {}) => {

    let filteredTransactions = [...transactions];

    if (accountId) {
        const account = getAccountById(accountId);

        if (!account) {
            throw new ApiError(404, `Account not found: ${accountId}`);
        }

        filteredTransactions = filteredTransactions.filter(
            (tx) => tx.accountId === accountId
        );
    }

    if (!isValidDate(startDate)) {
        throw new ApiError(400, "Invalid start_date. Use YYYY-MM-DD format.");
    }

    if (!isValidDate(endDate)) {
        throw new ApiError(400, "Invalid end_date. Use YYYY-MM-DD format.");
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        throw new ApiError(400, "start_date cannot be after end_date.");
    }

    if (startDate) {
        filteredTransactions = filteredTransactions.filter((tx) => {
            const txDate = new Date(tx.clearedDate);

            return txDate >= new Date(startDate);
        });
    }

    if (endDate) {

        filteredTransactions = filteredTransactions.filter((tx) => {

            const txDate = new Date(tx.clearedDate);

            return txDate <= new Date(endDate);
        });
    }

    return filteredTransactions.map((tx) => {

        const account = accounts.find(
            acc => acc.accountId === tx.accountId
        );

        const institution = institutions.find(
            inst => inst.id === account?.institutionId
        );

        return {
            transactionId: tx.transactionId,
            accountId: tx.accountId,
            rawMerchant: tx.rawMerchant,
            amount: tx.amount,
            direction: tx.direction,
            clearedDate: tx.clearedDate,
            mockBank: institution?.name || null
        };
    });
};
function getInstitutions() {
  return institutions;
};


export default {
  getAccounts,
  getAccountById,
  getTransactions,
  getInstitutions
};

