import React from "react";
import { Navigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));
const getUserRole = () => {
    return user ? user.role : null;
};

const AuthenticatedRoute = ({ element: Component, ...rest }) => {
    const userRole = getUserRole();

    if (userRole) {
        return <Navigate to="/" />;
    }

    return <Component {...rest} />;
};

export default AuthenticatedRoute;
