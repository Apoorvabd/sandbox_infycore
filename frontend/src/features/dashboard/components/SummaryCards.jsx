import StatCard from "../../../components/common/StatCard/StatCard";
import { Wallet, ArrowDownRight, ArrowUpRight, Activity } from "lucide-react";

export default function SummaryCards({ summary }) {
    if (!summary) return null;

    const totalBalance = summary.totalBalance ?? summary.total_balance ?? 0;
    const totalIncome = summary.totalIncome ?? summary.total_income ?? 0;
    const totalExpense = summary.totalExpense ?? summary.total_expense ?? 0;
    const totalTransactions = summary.totalTransactions ?? summary.total_transactions ?? 0;
    const totalAccounts = summary.totalAccounts ?? summary.total_accounts ?? 0;

    const cards = [
        {
            title: "Total Balance",
            value: `$${Number(totalBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: <Wallet className="w-6 h-6 text-orange-500" />,
            trend: null, // Backend can add this later if computed
        },
        {
            title: "Total Income",
            value: `$${Number(totalIncome).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: <ArrowUpRight className="w-6 h-6 text-emerald-500" />,
            trend: null,
        },
        {
            title: "Total Expense",
            value: `$${Number(totalExpense).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: <ArrowDownRight className="w-6 h-6 text-red-500" />,
            trend: null,
        },
        {
            title: "Transactions",
            value: Number(totalTransactions).toLocaleString(),
            icon: <Activity className="w-6 h-6 text-yellow-500" />,
            trend: null,
        },
        {
            title: "Total Accounts",
            value: Number(totalAccounts).toLocaleString(),
            icon: <Activity className="w-6 h-6 text-sky-400" />,
            trend: null,
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {cards.map((card, i) => (
                <StatCard 
                    key={i} 
                    title={card.title} 
                    value={card.value} 
                    icon={card.icon} 
                />
            ))}
        </div>
    );
}
