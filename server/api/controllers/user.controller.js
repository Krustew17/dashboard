import userService from "../services/user.service.js";

export const getAllUsers = (req, res) => {
    return userService.getAllUsers(req, res);
};
