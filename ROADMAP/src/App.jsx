import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <Toaster 
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#1e293b', // slate-800
                        color: '#f8fafc',      // slate-50
                        border: '1px solid #334155', // slate-700
                    },
                    success: {
                        iconTheme: {
                            primary: '#10b981', // emerald-500
                            secondary: '#1e293b',
                        },
                    },
                }}
            />
        </>
    );
}

export default App;