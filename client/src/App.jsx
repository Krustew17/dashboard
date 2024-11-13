import { Routes, Route } from "react-router-dom";
import paths from "./config/paths.js";

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
// import ProtectedRoute from "./components/protectedRoutes.jsx";
import Home from "./pages/home.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import LogsPage from "./pages/LogsPage.jsx";
import DashboardPage from "./pages/DashboadPage.jsx";

const App = () => {
    return (
        <Routes>
            <Route path={paths.home} element={<Home />} />
            <Route path={paths.dashboard} element={<DashboardPage />} />
            <Route path={paths.users} element={<UsersPage />} />
            <Route path={paths.analytics} element={<AnalyticsPage />} />
            <Route path={paths.logs} element={<LogsPage />} />
            <Route path={paths.login} element={<LoginPage />} />
            <Route path={paths.register} element={<RegisterPage />} />
            {/* <Route
                path="/"
                element={
                    <ProtectedRoute
                        allowedRoles={["admin"]}
                        children={<Home />}
                        to="/allowed"
                    />
                }
            /> */}
        </Routes>
    );
};

export default App;
