import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-950 text-white">

            <h1 className="text-7xl font-bold">
                404
            </h1>

            <p className="mt-4 text-gray-400">
                Page not found
            </p>

            <Link
                to="/"
                className="mt-8 rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700"
            >
                Go Home
            </Link>

        </div>
    );
}

export default NotFound;