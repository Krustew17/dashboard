import { Op } from "sequelize";

import db from "../../models/index.js";

const UserDevice = db.userDevice;

export default async function updateDeviceLastLogin(user, deviceInfo) {
    console.log(user, deviceInfo);
    const device = await UserDevice.findOne({
        where: {
            [Op.and]: [
                {
                    deviceInfo: {
                        [Op.like]: `%${deviceInfo.userAgent}%`,
                    },
                },
                // {
                //     deviceInfo: {
                //         [Op.like]: `%${deviceInfo.os}%`,
                //     },
                // },
            ],
            userId: user.id,
        },
    });

    if (device) {
        return await device.update({ lastLogin: new Date() });
    }
}
