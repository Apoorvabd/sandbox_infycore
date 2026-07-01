import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LayoutDashboard, BookText, Ruler, Siren, Terminal, X } from "lucide-react";
import { setSidebarOpen } from "../store/slices/uiSlice";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export default function Sidebar() {
    const { sidebarOpen } = useSelector((state) => state.ui);
    const dispatch = useDispatch();
    const location = useLocation();

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Ledger", href: "/ledger", icon: BookText },
        { name: "Rules", href: "/rules", icon: Ruler },
        { name: "Anomaly", href: "/anomaly", icon: Siren },
        { name: "Sandbox", href: "/sandbox", icon: Terminal },
    ];

    const currentPath = location.pathname;

    return (
        <>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm lg:hidden animate-slide-in-right"
                    onClick={() => dispatch(setSidebarOpen(false))}
                />
            )}

            <aside
                className={twMerge(
                    clsx(
                        "fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col",
                        !sidebarOpen && "-translate-x-full"
                    )
                )}
            >
                <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800">
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                        Sandbox Intelligence
                    </span>
                    <button
                        type="button"
                        className="lg:hidden text-slate-400 hover:text-white"
                        onClick={() => dispatch(setSidebarOpen(false))}
                    >
                        <span className="sr-only">Close sidebar</span>
                        <X className="w-6 h-6" aria-hidden="true" />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = currentPath.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={twMerge(
                                    clsx(
                                        "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-xl",
                                        isActive
                                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                                    )
                                )}
                            >
                                <item.icon
                                    className={twMerge(clsx("w-5 h-5", isActive ? "text-blue-400" : "text-slate-500"))}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
