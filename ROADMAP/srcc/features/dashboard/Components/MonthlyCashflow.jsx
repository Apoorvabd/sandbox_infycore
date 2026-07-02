import { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from "recharts";

import Card from "../../../components/common/Card";
import Skeleton from "../../../components/common/Skeleton";
import { getMonthlyCashflow } from "../dashboard.api";

const MonthlyCashflow = (refreshKey) => {

    const [cashflow, setCashflow] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchCashflow = async () => {

            console.group("📈 Monthly Cashflow");

            try {

                console.log("Fetching cashflow...");

                const data = await getMonthlyCashflow();

                console.table(data);

                const chartData = data.map(item => ({

                    month: item.month.slice(5),

                    income: Number(item.income),

                    expense: Number(item.expense),

                }));

                console.table(chartData);

                setCashflow(chartData);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

                console.groupEnd();

            }

        };

        fetchCashflow();

    }, [refreshKey]);

    if (loading) {

        return (

            <Card className="p-6 mt-6">

                <Skeleton
                    variant="rectangle"
                    className="w-full h-[350px]"
                />

            </Card>

        );

    }

    return (

        <Card className="p-6 mt-6">

            <div className="mb-6">

                <h2 className="text-xl font-semibold text-slate-100">
                    Monthly Cashflow
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                    Income vs Expense
                </p>

            </div>

            <div className="h-[350px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart data={cashflow}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#334155"
                        />

                        <XAxis
                            dataKey="month"
                            tick={{
                                fill: "#CBD5E1"
                            }}
                        />

                        <YAxis
                            tick={{
                                fill: "#CBD5E1"
                            }}
                        />

                        <Tooltip
                            contentStyle={{
                                background: "#1E293B",
                                border: "1px solid #334155",
                                borderRadius: 8,
                            }}
                        />

                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#10B981"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 7 }}
                        />

                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#EF4444"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 7 }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </Card>

    );

};


export default MonthlyCashflow;