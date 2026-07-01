import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import DashboardPage from "../features/dashboard/DashboardPage";
import LedgerPage from "../features/ledger/LedgerPage";
import RulesPage from "../features/rules/RulesPage";
import AnomalyPage from "../features/anomaly/AnomalyPage";
import SandboxPage from "../features/sandbox/SandboxPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />
            },
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
