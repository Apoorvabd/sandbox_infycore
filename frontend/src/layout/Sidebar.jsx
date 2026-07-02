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
                    className="fixed inset-0 z-40 bg-sky-950/20 backdrop-blur-sm lg:hidden animate-slide-in-right"
                    onClick={() => dispatch(setSidebarOpen(false))}
                />
            )}

            <aside
                className={twMerge(
                    clsx(
                        "fixed inset-y-0 left-0 z-50 w-72 bg-white/85 border-r border-sky-200/80 shadow-[0_10px_40px_rgba(125,211,252,0.18)] backdrop-blur-xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col",
                        !sidebarOpen && "-translate-x-full"
                    )
                )}
            >
                <div className="flex items-center justify-between h-16 px-6 border-b border-sky-200/80">
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">
                        Sandbox Intelligence
                    </span>
                    <button
                        type="button"
                        className="lg:hidden text-sky-500 hover:text-sky-700"
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
                                            ? "bg-sky-500/10 text-sky-700 border border-sky-300"
                                            : "text-slate-500 hover:text-sky-700 hover:bg-sky-50"
                                    )
                                )}
                            >
                                <item.icon
                                    className={twMerge(clsx("w-5 h-5", isActive ? "text-sky-600" : "text-slate-500"))}
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
