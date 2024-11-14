import React from "react";
import { Navigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));
const getUserRole = () => {
    return user ? user.role : null;
};

const ProtectedRoute = ({
    element: Component,
    allowedRoles,
    allowLoggedUser = true,
    ...rest
}) => {
    const userRole = getUserRole();

    if (!userRole) {
        return <Navigate to="/login" />;
    }
    if (!allowLoggedUser && user) {
        return <Navigate to="/" />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;
