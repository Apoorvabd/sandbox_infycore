import {
    getTotalAccounts,
    getTotalBalance,
    getTotalExpense,
    getTotalIncome,
    getTotalTransactions
} from "./dashboardApi.repository.js";

export const getSummary = async () => {

    const [
        accounts,
        balance,
        income,
        expense,
        transactions
    ] = await Promise.all([
        getTotalAccounts(),
        getTotalBalance(),
        getTotalIncome(),
        getTotalExpense(),
        getTotalTransactions()
    ]);

    return {
        totalAccounts: Number(accounts.total_accounts),

        totalBalance: Number(balance.total_balance),

        totalIncome: Number(income.total_income),

        totalExpense: Number(expense.total_expense),

        totalTransactions: Number(
            transactions.total_transactions
        )
    };
};