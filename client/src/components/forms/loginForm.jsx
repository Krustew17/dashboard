import React from "react";
import AuthForm from "./authForm";
import authFields from "../../config/authFields";
import authFormText from "../../constants/authFormText";

const LoginForm = ({ onDeviceLimitError, onUsernameChange }) => {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl/9 font-bold tracking-tight text-white">
                    Sign In
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <AuthForm
                    fields={authFields.login}
                    type="login"
                    text={authFormText.login}
                    onUsernameChange={onUsernameChange}
                    onDeviceLimitError={onDeviceLimitError}
                />
            </div>
        </div>
    );
};
export default LoginForm;
