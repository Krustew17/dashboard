import userService from "../services/user.service.js";

export const getUser = (req, res) => {
  return userService.getUser(req, res);
};
