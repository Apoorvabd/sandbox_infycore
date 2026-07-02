import { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import Card from "../../../components/common/Card";
import Skeleton from "../../../components/common/Skeleton";

import { getCategoryBreakdown } from "../dashboard.api";

const CategoryBreakdown = (refreshKey) => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchCategories = async () => {


            try {
                const data = await getCategoryBreakdown();
                const chartData = data.map(item => ({
                    category: item.category,
                    amount: Number(item.totalAmount),
                    transactions: item.transactionCount,
                }));
                setCategories(chartData);
            } catch (error) {

                console.error("❌ Category Breakdown Error");
                console.error(error);
            } finally {
                setLoading(false);
            }

        };

        fetchCategories();

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

        <Card className="mt-6 p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-yellow-100">
                        Category Breakdown
                    </h2>
                    <p className="text-sm text-yellow-400 mt-1">
                        Expense distribution by category
                    </p>

                </div>

            </div>

            <div className="h-[350px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart
                        data={categories}
                        margin={{ top: 10, right: 20, left: 0, bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#534155"
                        />
                        <XAxis
                            dataKey="category"
                            tick={{
                                fill: "#CDD5E1",
                                fontSize: 12,
                            }}
                        />
                        <YAxis
                            tick={{
                                fill: "#CBD5E1",
                                fontSize: 12,
                            }}
                        />

                        <Tooltip
                            contentStyle={{
                                background: "#1E293B",
                                border: "1px solid #334155",
                                borderRadius: "8px",
                                color: "#fff",
                            }}
                        />

                        <Bar
                            dataKey="amount"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default CategoryBreakdown;