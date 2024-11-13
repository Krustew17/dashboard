import React from "react";
import LoginForm from "../components/forms/loginForm.jsx";

const LoginPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="border border-stone-700 rounded-md bg-stone-800">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
