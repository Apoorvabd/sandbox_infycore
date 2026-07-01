import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import Card from '../../../components/common/Card/Card';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#0ea5e9']; // Slate-agnostic brights

export default function ExpenseChart({ cashflow, categoryBreakdown }) {
    const safeCashflow = Array.isArray(cashflow) ? cashflow : [];
    const safeCategoryBreakdown = Array.isArray(categoryBreakdown) ? categoryBreakdown : [];
    console.log("ExpenseChart - safeCashflow:", safeCashflow, "safeCategoryBreakdown:", safeCategoryBreakdown);

    if (safeCashflow.length === 0 && safeCategoryBreakdown.length === 0) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <Card className="h-80 flex items-center justify-center text-slate-500 bg-slate-900 border border-slate-800">
                    No cashflow data available.
                </Card>
                <Card className="h-80 flex items-center justify-center text-slate-500 bg-slate-900 border border-slate-800">
                    No category breakdown available.
                </Card>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-6">
            <Card className="p-6 bg-slate-800 border-slate-700 shadow-sm overflow-hidden flex flex-col h-96">
                <h3 className="text-lg font-semibold text-white mb-4">Monthly Cashflow</h3>
                <div className="flex-1 w-full relative -ml-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={safeCashflow} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis 
                                dataKey="month" 
                                stroke="#94a3b8" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                            />
                            <YAxis 
                                stroke="#94a3b8" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                                tickFormatter={(value) => `$${value}`} 
                            />
                            <Tooltip
                                cursor={{ fill: '#334155', opacity: 0.4 }}
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                            <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card className="p-6 bg-slate-800 border-slate-700 shadow-sm overflow-hidden flex flex-col h-96">
                <h3 className="text-lg font-semibold text-white mb-4">Expenses by Category</h3>
                <div className="flex-1 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} 
                                itemStyle={{ color: '#f8fafc' }}
                                formatter={(value) => `$${Number(value).toFixed(2)}`} 
                            />
                            <Pie
                                data={safeCategoryBreakdown}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={90}
                                paddingAngle={9}
                                dataKey="totalAmount"
                                nameKey="category"
                            >
                                {safeCategoryBreakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Custom Legend to save space inside the chart itself */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                        {safeCategoryBreakdown.map((entry, index) => (
                            <div key={entry.category} className="flex items-center gap-2 text-sm text-slate-300">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                {entry.category}
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
}
