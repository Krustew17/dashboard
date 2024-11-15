import React from "react";
import { Navigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));

const AuthenticatedRoute = ({ element: Component, ...rest }) => {
    if (user) {
        return <Navigate to="/" />;
    }

    return <Component {...rest} />;
};

export default AuthenticatedRoute;
