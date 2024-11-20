import React from "react";
import RegisterForm from "../components/forms/registerForm.jsx";

const RegisterPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-2/4 left-1/3 w-96 h-96 bg-purple-700 opacity-30 blur-3xl rounded-full"></div>
                <div className="absolute bottom-2/4 right-2/3 w-72 h-72 bg-indigo-400 opacity-20 blur-3xl rounded-full"></div>
                {/* <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-blue-700 opacity-25 blur-2xl rounded-full"></div> */}
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-400 opacity-25 blur-3xl rounded-full"></div>
                <div className="absolute top-5/5 right-2/4 w-64 h-64 bg-indigo-600 opacity-25 blur-3xl rounded-full"></div>
            </div>
            <div className="border border-stone-700 rounded-md bg-stone-800">
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;
