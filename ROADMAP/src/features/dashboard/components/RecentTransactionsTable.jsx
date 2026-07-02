import Card from "../../../components/common/Card/Card";
import Badge from "../../../components/common/Badge/Badge";

export default function RecentTransactionsTable({ transactions }) {
    if (!transactions || transactions.length === 0) {
        return (
            <Card className="p-6 mt-6 bg-slate-800 border-slate-700 flex flex-col items-center justify-center h-48 text-slate-400">
                No recent transactions found.
            </Card>
        );
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString();
    };

    const formatCurrency = (amount) => {
        return `$${Number(amount).toFixed(2)}`;
    };

    return (
        <Card className="mt-6 bg-slate-800 border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-400 uppercase bg-slate-900/50">
                        <tr>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Merchant</th>
                            <th className="px-6 py-4 font-medium">Category</th>
                            <th className="px-6 py-4 font-medium">Direction</th>
                            <th className="px-6 py-4 font-medium text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        {transactions.map((tx, idx) => (
                            <tr key={tx.id || idx} className="hover:bg-slate-700/25 transition-colors">
                                <td className="px-6 py-4 text-slate-300 whitespace-nowrap">
                                    {formatDate(tx.cleared_date || tx.created_at)}
                                </td>
                                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    {tx.normalized_merchant || tx.raw_merchant}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${tx.category === 'Uncategorized' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                                        <span className="text-slate-300">{tx.category || "Uncategorized"}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge 
                                        variant={tx.direction?.toLowerCase() === 'credit' ? 'success' : 'default'}
                                        className={tx.direction?.toLowerCase() === 'credit' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-700 text-slate-300 border-slate-600'}
                                    >
                                        {tx.direction?.toUpperCase()}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 font-semibold text-right whitespace-nowrap">
                                    <span className={tx.direction?.toLowerCase() === 'credit' ? 'text-emerald-400' : 'text-slate-200'}>
                                        {tx.direction?.toLowerCase() === 'credit' ? '+' : ''}{formatCurrency(tx.amount)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
