import { Menu, Bell, Search, Hexagon } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../store/slices/uiSlice";

export default function Header() {
    const dispatch = useDispatch();

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 py-4 bg-white/80 border-b border-sky-200/80 backdrop-blur-md sm:px-6 lg:px-8 shadow-[0_1px_0_rgba(148,163,184,0.18)]">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    className="p-2 -m-2 text-sky-500 lg:hidden hover:text-sky-700"
                    onClick={() => dispatch(toggleSidebar())}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Menu className="w-6 h-6" aria-hidden="true" />
                </button>
                
                {/* Search / Context placeholder (can be expanded later) */}
                <div className="hidden md:flex items-center text-slate-500 bg-sky-50 rounded-lg px-3 py-1.5 border border-sky-200 focus-within:border-sky-400 focus-within:ring-1 focus-within:ring-sky-300 transition-all">
                    <Search className="w-4 h-4 mr-2 text-sky-500" />
                    <input 
                        type="text" 
                        placeholder="Quick search..."
                        className="bg-transparent border-none text-sm text-slate-800 focus:outline-none placeholder-slate-400 w-64"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button type="button" className="p-2 text-sky-500 hover:text-sky-700">
                    <span className="sr-only">View notifications</span>
                    <Bell className="w-5 h-5" aria-hidden="true" />
                </button>
                <a href="/" className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold border border-sky-200 shadow-md">
                    <Hexagon className="w-4 h-4" />
                </a>
            </div>
        </header>
    );
}
