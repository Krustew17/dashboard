import db from "../../models/index.js";

const UserDevice = db.userDevice;

const getUserDevices = (req, res) => {
    try {
        const userId = req.user.id;

        const devices = UserDevice.findAndCountAll({
            where: { userId },
        });

        if (!devices) {
            return res.status(404).json({ message: "Devices not found" });
        }

        return res
            .status(200)
            .json({ devices: devices.rows, devicesCount: devices.count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export default { getUserDevices };
