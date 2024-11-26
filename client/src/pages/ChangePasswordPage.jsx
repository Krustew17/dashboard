import React from "react";
import ChangePasswordForm from "../components/forms/ChangePasswordForm";
import Nav from "../components/Navbar";

const ChangePasswordPage = () => {
    return (
        <div>
            <Nav />
            <div className="fixed w-full mx-auto h-full bg-opacity-50 flex justify-center items-center z-50 overflow-scroll sm:overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-2/4 left-1/3 w-96 h-96 bg-purple-700 opacity-30 blur-3xl rounded-full"></div>
                    <div className="absolute bottom-2/4 right-2/3 w-72 h-72 bg-indigo-400 opacity-20 blur-3xl rounded-full"></div>
                    <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-400 opacity-25 blur-3xl rounded-full"></div>
                    <div className="absolute top-5/5 right-2/4 w-64 h-64 bg-indigo-600 opacity-25 blur-3xl rounded-full"></div>
                </div>
                <div className="border border-stone-700 rounded-md bg-stone-800">
                    <ChangePasswordForm />
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
