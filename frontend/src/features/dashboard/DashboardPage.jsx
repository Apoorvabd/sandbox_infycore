import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import PageHeader from "../../components/common/PageHeader/PageHeader";
import Spinner from "../../components/common/Spinner/Spinner";

import { dashboardApi } from "./api/dashboardApi";
import { 
    setDashboardLoading,
    setSummary,
    setCategoryBreakdown,
    setCashflow,
    setRecentTransactions,
    setDashboardError
} from "../../store/slices/dashboardSlice";

import SummaryCards from "./components/SummaryCards";
import ExpenseChart from "./components/ExpenseChart";
import RecentTransactionsTable from "./components/RecentTransactionsTable";
import { extractApiData, toArray } from "../../utils/apiData";

export default function DashboardPage() {
    const dispatch = useDispatch();
    const { 
        summary, 
        categoryBreakdown, 
        cashflow, 
        recentTransactions, 
        isLoading,
        error 
    } = useSelector((state) => state.dashboard);

    useEffect(() => {
        let isMounted = true;
        const fetchDashboardData = async () => {
            dispatch(setDashboardLoading(true));
            try {
                // Fetch in parallel as they are independent charts
                const [summaryRes, categoryRes, cashflowRes, recentRes] = await Promise.all([
                    dashboardApi.getSummary(),
                    dashboardApi.getCategoryBreakdown(),
                    dashboardApi.getCashflow(),
                    dashboardApi.getRecentTransactions(10)
                ]);

                if (isMounted) {
                    dispatch(setSummary(extractApiData(summaryRes) ?? null));
                    dispatch(setCategoryBreakdown(toArray(extractApiData(categoryRes))));
                    dispatch(setCashflow(toArray(extractApiData(cashflowRes))));
                    dispatch(setRecentTransactions(toArray(extractApiData(recentRes))));
                }
            } catch (err) {
                if (isMounted) {
                    dispatch(setDashboardError("Failed to load dashboard data."));
                    toast.error(err.message || "Failed to load dashboard data");
                }
            } finally {
                if (isMounted) dispatch(setDashboardLoading(false));
            }
        };

        fetchDashboardData();

        return () => {
            isMounted = false;
        };
    }, [dispatch]);

    return (
        <div className="space-y-6">
            <PageHeader 
                title="Dashboard Overview" 
                description="Financial intelligence summary, recent transactions, and cashflow analytics." 
            />
            
            {isLoading && !summary ? (
                <div className="flex items-center justify-center py-20 min-h-[50vh]">
                    <Spinner size="lg" className="text-blue-500" />
                </div>
            ) : error ? (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                    {error}
                </div>
            ) : (
                <>
                    <SummaryCards summary={summary} />
                    <ExpenseChart cashflow={cashflow} categoryBreakdown={categoryBreakdown} />
                    <RecentTransactionsTable transactions={recentTransactions} />
                </>
            )}
        </div>
    );
}
