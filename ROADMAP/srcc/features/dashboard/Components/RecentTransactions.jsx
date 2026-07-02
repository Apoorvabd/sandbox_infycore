import { useEffect, useState } from "react";
import {
    ArrowDownLeft,
    ArrowUpRight
} from "lucide-react";

import Card from "../../../components/common/Card";
import Badge from "../../../components/common/Badge";
import Skeleton from "../../../components/common/Skeleton";

import { getRecentTransactions } from "../dashboard.api";

const RecentTransactions = (refreshKey) => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchTransactions = async () => {

            console.group("💳 Recent Transactions");

            try {

                const data =
                    await getRecentTransactions(9);

                console.table(data);

                setTransactions(data);

            }

            catch (err) {

                console.error(err);

            }

            finally {

                setLoading(false);

                console.groupEnd();

            }

        };

        fetchTransactions();

    }, [refreshKey]);

    return (

        <Card className="p-6 mt-6">

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h2 className="text-xl font-semibold text-slate-100">
                        Recent Transactions
                    </h2>

                    <p className="text-sm text-slate-400 mt-1">
                        Latest financial activity
                    </p>

                </div>

            </div>

            {
                loading ?

                    <div className="space-y-4">

                        {
                            [...Array(6)].map((_, i) => (

                                <Skeleton
                                    key={i}
                                    variant="rectangle"
                                    className="w-full h-16 rounded-xl"
                                />

                            ))
                        }

                    </div>

                    :

                    <div className="divide-y divide-slate-800">

                        {

                            transactions.map((tx) => (

                                <div
                                    key={tx.id}
                                    className="flex items-center justify-between py-4 hover:bg-slate-900/40 px-2 rounded-lg transition"
                                >

                                    <div className="flex items-center gap-4">

                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center
                                            ${
                                                tx.direction === "credit"
                                                    ? "bg-emerald-500/20"
                                                    : "bg-red-500/20"
                                            }`}
                                        >

                                            {

                                                tx.direction === "credit"

                                                    ?

                                                    <ArrowDownLeft
                                                        className="text-emerald-400"
                                                        size={18}
                                                    />

                                                    :

                                                    <ArrowUpRight
                                                        className="text-red-400"
                                                        size={18}
                                                    />

                                            }

                                        </div>

                                        <div>

                                            <h3 className="font-medium text-slate-100">

                                                {tx.merchant}

                                            </h3>

                                            <div className="flex items-center gap-2 mt-1">

                                                <Badge>

                                                    {tx.category}

                                                </Badge>

                                                <span className="text-xs text-slate-500">

                                                    {

                                                        new Date(tx.date)
                                                            .toLocaleDateString()

                                                    }

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    <div
                                        className={`font-semibold text-lg
                                        ${
                                            tx.direction === "credit"
                                                ? "text-emerald-400"
                                                : "text-red-400"
                                        }`}
                                    >

                                        {

                                            tx.direction === "credit"

                                                ?

                                                "+"

                                                :

                                                "-"

                                        }

                                        $

                                        {

                                            tx.amount.toFixed(2)

                                        }

                                    </div>

                                </div>

                            ))

                        }

                    </div>

            }

        </Card>

    );

};

export default RecentTransactions;