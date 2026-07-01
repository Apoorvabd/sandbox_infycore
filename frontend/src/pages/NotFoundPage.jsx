import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-950 text-center">
            <AlertCircle className="w-16 h-16 text-slate-500 mb-6" />
            <h1 className="text-4xl font-bold text-white mb-2">404 - Page Not Found</h1>
            <p className="text-slate-400 mb-8">The page you are looking for does not exist or has been moved.</p>
            <Link 
                to="/dashboard"
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(249,115,22,0.3)]"
            >
                Return to Dashboard
            </Link>
        </div>
    );
}
