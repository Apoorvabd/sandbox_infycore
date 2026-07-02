import StatCard from "../../../components/common/StatCard/StatCard";
import { Wallet, ArrowDownRight, ArrowUpRight, Activity } from "lucide-react";

export default function SummaryCards({ summary }) {
    if (!summary) return null;

    const cards = [
        {
            title: "Total Balance",
            value: `$${Number(summary.total_balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: <Wallet className="w-6 h-6 text-blue-500" />,
            trend: null, // Backend can add this later if computed
        },
        {
            title: "Total Income",
            value: `$${Number(summary.total_income || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: <ArrowUpRight className="w-6 h-6 text-emerald-500" />,
            trend: null,
        },
        {
            title: "Total Expense",
            value: `$${Number(summary.total_expense || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: <ArrowDownRight className="w-6 h-6 text-red-500" />,
            trend: null,
        },
        {
            title: "Transactions",
            value: summary.total_transactions?.toLocaleString() || "0",
            icon: <Activity className="w-6 h-6 text-sky-400" />,
            trend: null,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
