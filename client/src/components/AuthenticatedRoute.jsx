import React from "react";
import { Navigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));
const getUserRole = () => {
    return user ? user.role : null;
};

const AuthenticatedRoute = ({ element: Component, ...rest }) => {
    const userRole = getUserRole();

    // If the user is logged in, redirect to the dashboard or home
    if (userRole) {
        return <Navigate to="/" />;
    }

    // Otherwise, allow access to the route (login/register)
    return <Component {...rest} />;
};

export default AuthenticatedRoute;
