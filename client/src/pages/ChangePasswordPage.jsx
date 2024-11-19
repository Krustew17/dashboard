import React from "react";
import ChangePasswordForm from "../components/forms/ChangePasswordForm";

const ChangePasswordPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="border border-stone-700 rounded-md bg-stone-800">
                <ChangePasswordForm />
            </div>
        </div>
    );
};

export default ChangePasswordPage;
