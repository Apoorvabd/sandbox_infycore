import {
    getTotalAccounts,
    getTotalBalance,
    getTotalExpense,
    getTotalIncome,
    getTotalTransactions,
    getMonthlyCashflow
} from "./dashboardApi.repository.js";

import {
    getCategoryBreakdown,getRecentTransactions
} from "./dashboardApi.repository.js";

export const recentTransactions =async (
    limit = 10
) => {

    const transactions =
        await getRecentTransactions(
            limit
        );

    return transactions.map(t => ({
        id: t.id,

        merchant:
            t.normalized_merchant,

        category:
            t.category,

        amount:
            Number(t.amount),

        direction:
            t.direction,

        date:
            t.cleared_date
    }));
};
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

export const categoryBreakdown = async () => {

    const breakdown =
        await getCategoryBreakdown();

    return breakdown.map(item => ({
        category: item.category,

        totalAmount:
            Number(item.total_amount),

        transactionCount:
            Number(item.transaction_count)
    }));
};

export const monthlyCashflow =async () => {

    const data =
        await getMonthlyCashflow();

    return data.map(item => ({
        month: item.month,

        income:
            Number(item.income),

        expense:
            Number(item.expense)
    }));
};