import {
    MAX_PASSWORD_LENGTH,
    MAX_USERNAME_LENGTH,
    MIN_PASSWORD_LENGTH,
    MIN_USERNAME_LENGTH,
} from "../../../config/constants.js";

const validatePassword = (password) => {
    if (!password || password.trim() == "") {
        throw new Error("Password cannot be empty.");
    }
    if (
        password.length > MAX_PASSWORD_LENGTH ||
        password.length < MIN_PASSWORD_LENGTH
    ) {
        throw new Error(
            `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters long.`,
        );
    }
    if (!password.match(/\d/)) {
        throw new Error("Password must contain at least one number.");
    }
};

const validateUsername = (username) => {
    if (!username || username.trim() == "") {
        throw new Error("Username cannot be empty.");
    }
    if (
        username.length > MAX_USERNAME_LENGTH ||
        username.length < MIN_USERNAME_LENGTH
    ) {
        throw new Error(
            `Username must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters long.`,
        );
    }
    if (username.includes(" ")) {
        throw new Error("Username cannot contain spaces.");
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
        throw new Error("Username must contain letters and numbers only.");
    }
};
export default { validatePassword, validateUsername };
