import {Routes,Route} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Showcase from "../pages/Showcase";
import Ledger from "../pages/Ledger";
import Rules from "../pages/Rules";
import Sandbox from "../pages/Sandbox";
import NotFound from "../pages/NotFound";

function AppRouter() {

    return (

        <Routes>
            <Route path="/" element={<Dashboard />}
            />
            <Route path="/showcase" element={<Showcase />}
            />
            <Route path="/ledger" element={<Ledger />}
            />

            <Route path="/rules" element={<Rules />}
            />

            <Route path="/sandbox" element={<Sandbox />}
            />

            <Route path="*" element={<NotFound />}
            />

        </Routes>

    );

}

export default AppRouter;