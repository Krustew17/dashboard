import userDeviceService from "../services/userDevices.service.js";

export const getUserDevices = (req, res) => {
    return userDeviceService.getUserDevices(req, res);
};
