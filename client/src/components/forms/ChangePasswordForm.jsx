import React from "react";
import AuthForm from "./authForm";
import authFields from "../../config/authFields";
import authFormText from "../../constants/authFormText";

const ChangePasswordForm = () => {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl/9 font-bold tracking-tight text-white">
                    Change Password
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <AuthForm
                    fields={authFields.changePassword}
                    type="change-password"
                    text={authFormText.changePassword}
                />
            </div>
        </div>
    );
};
export default ChangePasswordForm;
