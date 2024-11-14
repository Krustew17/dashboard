import { Routes, Route } from "react-router-dom";
import paths from "./config/paths.js";

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import ProtectedRoute from "./components/protectedRoutes.jsx";
import HomePage from "./pages/HomePage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import LogsPage from "./pages/LogsPage.jsx";
import DashboardPage from "./pages/DashboadPage.jsx";
import DocumentsPage from "./pages/DocumentsPage.jsx";

const App = () => {
    return (
        <Routes>
            <Route
                path={paths.home}
                element={<ProtectedRoute element={HomePage} />}
            />
            <Route
                path={paths.dashboard}
                element={
                    <ProtectedRoute
                        allowedRoles={["admin"]}
                        element={DashboardPage}
                    />
                }
            />
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
                element={
                    <ProtectedRoute
                        element={LoginPage}
                        allowLoggedUser={false}
                    />
                }
            />
            <Route
                path={paths.register}
                element={
                    <ProtectedRoute
                        element={RegisterPage}
                        allowLoggedUser={false}
                    />
                }
            />
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
