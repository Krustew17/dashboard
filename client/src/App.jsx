import { Routes, Route } from "react-router-dom";
import paths from "./config/paths.js";

import LoginPage from "./pages/loginPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
// import ProtectedRoute from "./components/protectedRoutes.jsx";
import Home from "./pages/home.jsx";

const App = () => {
    return (
        <Routes>
            <Route path={paths.home} element={<Home />} />
            <Route path={paths.dashboard} element={<h1>dashboard</h1>} />
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
