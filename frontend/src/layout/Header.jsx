import { Menu, Bell, Search, Hexagon } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../store/slices/uiSlice";

export default function Header() {
    const dispatch = useDispatch();

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 py-4 bg-slate-900/80 border-b border-slate-800 backdrop-blur-md sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    className="p-2 -m-2 text-slate-400 lg:hidden hover:text-white"
                    onClick={() => dispatch(toggleSidebar())}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Menu className="w-6 h-6" aria-hidden="true" />
                </button>
                
                {/* Search / Context placeholder (can be expanded later) */}
                <div className="hidden md:flex items-center text-slate-500 bg-slate-800/50 rounded-lg px-3 py-1.5 border border-slate-700/50 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
                    <Search className="w-4 h-4 mr-2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Quick search..."
                        className="bg-transparent border-none text-sm text-slate-200 focus:outline-none placeholder-slate-500 w-64"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button type="button" className="p-2 text-slate-400 hover:text-slate-300">
                    <span className="sr-only">View notifications</span>
                    <Bell className="w-5 h-5" aria-hidden="true" />
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold border border-slate-700 shadow-md">
                    <Hexagon className="w-4 h-4" />
                </div>
            </div>
        </header>
    );
}
