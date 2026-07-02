import { RefreshCw } from "lucide-react";

import Button from "../../../components/common/Button";

import { useDispatch } from "react-redux";

import { fetchDashboardSummary } from "../../../store/dashboard/dashboardThunks";

const DashboardHeader = (onRefresh) => {

const handleRefresh = () => {

    console.log("Refreshing Dashboard");

    dispatch(fetchDashboardSummary());

};

    return (

        <div
            className="
                flex
                flex-col
                md:flex-row
                justify-between
                items-start
                md:items-center
                gap-4
            "
        >

            <div>

                <h1
                    className="
                        text-4xl
                        font-bold
                        text-yellow-800
                    "
                >
                    Dashboard
                </h1>

                <p
                    className="
                        text-yellow-400
                        mt-3 font-semibold text-xl
                    "
                >
                    Financial overview and anomaly monitoring
                </p>

            </div>

            <Button

                variant="primary"

               onClick={handleRefresh}

                icon={<RefreshCw size={18}/>}

            >

                Refresh

            </Button>

        </div>

    );

};
export default DashboardHeader;

