import userService from "../services/user.service.js";

export const getAllUsers = (req, res) => {
    return userService.getAllUsers(req, res);
};

export const getActiveUserCount = (req, res) => {
    return userService.getActiveUserCount(req, res);
}

export const editUser = (req, res) => {
    return userService.editUser(req, res);
};

export const deleteUser = (req, res) => {
    return userService.deleteUser(req, res);
};
