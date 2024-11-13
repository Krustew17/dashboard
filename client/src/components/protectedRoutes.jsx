// import React from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//     const navigate = useNavigate();
//     const user = useSelector((state) => state.auth.userInfo);
//     console.log(user);

//     if (!user) {
//         navigate("/login");
//         console.log("no user");
//         // return null;
//     }

//     const hasAccess = user?.role && allowedRoles.includes(user?.role);

//     if (!hasAccess) {
//         navigate("/not-authorized", { replace: true });
//     }

//     return children;
// };

// export default ProtectedRoute;
