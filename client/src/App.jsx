import { Routes, Route } from "react-router-dom";
import paths from "./config/paths.js";

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import ProtectedRoute from "./components/protectedRoutes.jsx";
import HomePage from "./pages/HomePage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import LogsPage from "./pages/LogsPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import DocumentsPage from "./pages/DocumentsPage.jsx";
import DevicesPage from "./pages/DevicesPage.jsx";
import AuthenticatedRoute from "./components/AuthenticatedRoute.jsx";
import useRouteChange from "./components/hooks/useRouteChange.jsx";
import ChangePasswordPage from "./pages/ChangePasswordPage.jsx";
import { useSelector } from "react-redux";

const App = () => {
    const user = useSelector((state) => state.auth.userInfo);
    if (user) {
        useRouteChange();
    }

    return (
        <Routes>
            <Route path={paths.home} element={<HomePage />} />
            {/* <Route
                path={paths.dashboard}
                element={
                    <ProtectedRoute
                        allowedRoles={["admin"]}
                        element={DashboardPage}
                    />
                }
            /> */}
            <Route
                path={paths.users}
                element={
                    <ProtectedRoute
                        allowedRoles={["admin"]}
                        element={UsersPage}
                    />
                }
            />
            <Route
                path={paths.analytics}
                element={
                    <ProtectedRoute
                        allowedRoles={["admin", "viewer"]}
                        element={AnalyticsPage}
                    />
                }
            />
            <Route
                path={paths.logs}
                element={
                    <ProtectedRoute
                        allowedRoles={["admin", "viewer"]}
                        element={LogsPage}
                    />
                }
            />
            <Route
                path={paths.login}
                element={<AuthenticatedRoute element={LoginPage} />}
            />
            <Route
                path={paths.register}
                element={<AuthenticatedRoute element={RegisterPage} />}
            />
            <Route
                path={paths.changePassword}
                element={
                    <ProtectedRoute
                        allowedRoles={["admin", "updated", "viewer", "sed1"]}
                        element={ChangePasswordPage}
                    />
                }
            />
            <Route path={paths.devices} element={<DevicesPage />} />
            <Route
                path={paths.documents}
                element={
                    <ProtectedRoute
                        allowedRoles={["admin", "updater"]}
                        element={DocumentsPage}
                    />
                }
            />
        </Routes>
    );
};

export default App;
