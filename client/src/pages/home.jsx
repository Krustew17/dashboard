import React from "react";
import { logout } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "../components/Navbar";

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.userInfo);
    console.log(user);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
            <Nav />
        </div>
    );
};

export default Home;
