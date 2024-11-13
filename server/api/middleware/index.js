import attachUser from "./attachUser.js";
import checkPermissions from "./checkPermissions.js";
import checkUserDevice from "./checkUserDevice.js";
import getTokenFromHeader from "./getTokenFromHeader.js";
import updateDeviceLastLogin from "./updateDeviceLastLogin.js";
import verifyToken from "./verifyToken.js";

export default {
    attachUser,
    verifyToken,
    getTokenFromHeader,
    checkPermissions,
    checkUserDevice,
    updateDeviceLastLogin,
};
