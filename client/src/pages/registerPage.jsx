import React from "react";
import RegisterForm from "../components/forms/registerForm.jsx";

const RegisterPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="border border-stone-700 rounded-md bg-stone-800">
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;
