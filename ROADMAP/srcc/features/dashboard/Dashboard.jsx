import DashboardHeader from "./Components/DashboardHeader.jsx";
import SummaryCards from "./Components/SummaryCards.jsx";
import CategoryBreakdown from "./Components/CategoryBreakdown";
import MonthlyCashflow from "./Components/MonthlyCashflow";
import RecentTransactions from "./Components/RecentTransactions";
import { useState } from "react";


const Dashboard = () => {
    console.groupEnd();
    const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {

    console.log("Refreshing Dashboard");

    setRefreshKey(prev => prev + 1);

};

    return (

        <div className="space-y-8">

            <DashboardHeader 

             onRefresh={handleRefresh}/>

            <SummaryCards refreshKey={refreshKey} />

            <div
                className="
                    grid
                    grid-cols-1
                    xl:grid-cols-2
                    gap-6
                "
            >

                <CategoryBreakdown refreshKey={refreshKey}/>

                <MonthlyCashflow refreshKey={refreshKey}/>

            </div>

            <RecentTransactions refreshKey={refreshKey}/>

        </div>

    );

};

export default Dashboard;