import { MAX_USER_DEVICES } from "../../config/constants.js";
import db from "../../models/index.js";
import updateDeviceLastLogin from "./updateDeviceLastLogin.js";

const UserDevice = db.userDevice;
const User = db.user;

export default async function checkUserDevice(req, res, next) {
    try {
        let deviceExists = false;
        const {
            username,
            deviceType,
            deviceModel,
            os,
            browser,
            browserVersion,
        } = req.body;

        const user = await User.findOne({
            where: {
                username: username,
            },
        });
        const devices = await UserDevice.findAndCountAll({
            where: { userId: user.id },
        });

        if (devices.count >= MAX_USER_DEVICES) {
            return res.status(400).json({
                message: `User cannot exceed ${MAX_USER_DEVICES} devices.`,
            });
        }

        const deviceInfo = {
            deviceType,
            deviceModel,
            os,
            browser,
            browserVersion,
        };

        if (devices) {
            deviceExists = devices.rows.some((element) => {
                return (
                    element.dataValues.deviceInfo == JSON.stringify(deviceInfo)
                );
            });
        }

        if (!deviceExists) {
            await UserDevice.create({
                userId: user.id,
                deviceInfo: JSON.stringify(deviceInfo),
                lastLogin: new Date(),
            });
        }
        console.log("updating last login...");

        await updateDeviceLastLogin(user, deviceInfo);

        next();
    } catch (err) {
        console.log(err);
    }
}
