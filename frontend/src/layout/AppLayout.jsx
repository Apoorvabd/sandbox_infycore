import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
            <Sidebar />
            <div className="flex flex-col flex-1 w-0 overflow-hidden">
                <Header />
                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
