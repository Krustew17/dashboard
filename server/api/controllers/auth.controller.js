import authService from "../services/auth.service.js";

export const registerUser = (req, res) => {
    return authService.registerUser(req, res);
};

export const loginUser = (req, res) => {
    return authService.loginUser(req, res);
};

export const refreshToken = (req, res) => {
    return authService.refreshToken(req, res);
};

export const changePassword = (req, res) => {
    return authService.changePassword(req, res);
};
