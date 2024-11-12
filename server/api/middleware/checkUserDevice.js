import { UAParser } from "ua-parser-js";

import { MAX_USER_DEVICES } from "../../config/constants.js";
import db from "../../models/index.js";

const UserDevice = db.userDevice;
const User = db.user;
export default async function checkUserDevice(req, res, next) {
    try {
        let deviceExists = false;
        const username = req.body.username;
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

        const userAgent = req.headers["user-agent"];
        const parser = new UAParser();
        parser.setUA(userAgent);
        const device = parser.getResult();

        const deviceJSON = JSON.stringify(device.ua);
        if (devices) {
            deviceExists = devices.rows.some((element) => {
                return (
                    JSON.stringify(element.dataValues.deviceInfo.ua) ==
                    deviceJSON
                );
            });
        }
        if (!deviceExists) {
            await UserDevice.create({
                userId: user.id,
                deviceInfo: device,
            });
        }

        next();
    } catch (err) {
        console.log(err);
    }
}
