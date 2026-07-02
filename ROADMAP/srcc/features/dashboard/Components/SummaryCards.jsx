import {
    Wallet,
    ArrowDownCircle,
    ArrowUpCircle,
    TriangleAlert,
} from "lucide-react";

import StatCard from "../../../components/common/StatCard";
import {getDashboardSummary} from "../dashboard.api";
import { useEffect, useState } from "react";
import Card from "../../../components/common/Card";
import Skeleton from "../../../components/common/Skeleton";
import { useDispatch, useSelector } from "react-redux";

import { fetchDashboardSummary } from "../../../store/dashboard/dashboardThunks";

import {selectSummary,    selectDashboardLoading,
} from "../../../store/dashboard/dashboardSelectors";



const SummaryCards = (refreshKey) => {

   const dispatch = useDispatch();
   const summary = useSelector(selectSummary);
   const loading = useSelector(selectDashboardLoading);

 useEffect(() => {

    console.log("🚀 Dispatch Summary");

    dispatch(fetchDashboardSummary());

}, [dispatch]);





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


    console.groupEnd();

    return (

        <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4
                gap-6
            "
        >

            <StatCard
                title="Current Balance"
                value={`$${summary.totalBalance.toLocaleString()}`}
                icon={Wallet}
            />

            <StatCard
                title="Income"
                value={`$${summary.totalIncome.toLocaleString()}`}
                icon={ArrowDownCircle}
                trendDirection="up"
            />

            <StatCard
                title="Expense"
                value={`$${summary.totalExpense.toLocaleString()}`}
                icon={ArrowUpCircle}
                trendDirection="down"
            />

            <StatCard
                title="Total Accounts"
                value={summary.totalAccounts}
                icon={Wallet}
            />

        </div>

    );

};

export default SummaryCards;