import React, { useState } from "react";
import LoginForm from "../components/forms/loginForm.jsx";
import DeviceManageModal from "../components/DeviceManageModal.jsx";

const LoginPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState("");

    const handleDeviceLimitError = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="border border-stone-700 rounded-md bg-stone-800">
                <LoginForm
                    onDeviceLimitError={handleDeviceLimitError}
                    onUsernameChange={setUsername}
                />
            </div>
            {showModal && (
                <DeviceManageModal
                    isOpen={showModal}
                    onClose={handleDeviceLimitError}
                    username={username}
                />
            )}
        </div>
    );
};

export default LoginPage;
