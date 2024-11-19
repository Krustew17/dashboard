const authFields = {
    register: [
        {
            name: "username",
            type: "text",
            placeholder: "Username",
        },
        {
            name: "password",
            type: "password",
            placeholder: "Password",
        },
        {
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
        },
    ],
    login: [
        {
            name: "username",
            type: "text",
            placeholder: "Username",
        },
        {
            name: "password",
            type: "password",
            placeholder: "Password",
        },
    ],
    changePassword: [
        {
            name: "currentPassword",
            type: "password",
            placeholder: "Current Password",
        },
        {
            name: "newPassword",
            type: "password",
            placeholder: "New Password",
        },
        {
            name: "confirmNewPassword",
            type: "password",
            placeholder: "Confirm New Password",
        },
    ],
};

export default authFields;
