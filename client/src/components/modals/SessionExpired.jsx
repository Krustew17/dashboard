import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetSession } from "../../redux/slices/sessionSlice";
import { logout } from "../../redux/slices/authSlice";

const SessionExpiredModal = () => {
    const isSessionExpired = useSelector(
        (state) => state.session.sessionExpired
    );
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(resetSession());
        dispatch(logout());
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    const handleHomePage = () => {
        dispatch(resetSession());
        dispatch(logout());
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    if (!isSessionExpired) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 px-2">
            <div className="bg-stone-700 p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold mb-4 text-white">
                    Session Expired
                </h1>
                <p className="text-gray-100 mb-6">
                    Your session has expired. Please log in again to continue.
                </p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handleHomePage}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Home Page
                    </button>
                    <button
                        onClick={handleLogin}
                        className="px-4 py-2 bg-stone-600 text-white rounded hover:bg-stone-800"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SessionExpiredModal;
