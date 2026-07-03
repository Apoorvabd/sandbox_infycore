import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import HomePage from "../pages/HomePage";
import DashboardPage from "../features/dashboard/DashboardPage";
import LedgerPage from "../features/ledger/LedgerPage";
import RulesPage from "../features/rules/RulesPage";
import AnomalyPage from "../features/anomaly/AnomalyPage";
import SandboxPage from "../features/sandbox/SandboxPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <NotFoundPage />,
    },
    {
        element: <AppLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "dashboard",
                element: <DashboardPage />
            },
            {
                path: "ledger",
                element: <LedgerPage />
            },
            {
                path: "rules",
                element: <RulesPage />
            },
            {
                path: "anomaly",
                element: <AnomalyPage />
            },
            {
                path: "sandbox",
                element: <SandboxPage />
            }
        ]
    }
]);

export default router;
