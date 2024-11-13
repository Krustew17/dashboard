import db from "../../models/index.js";

const UserDevice = db.userDevice;

const getUserDevices = async (req, res) => {
    try {
        const userId = req.user.id;

        const devices = await UserDevice.findAndCountAll({
            where: { userId },
        });

        if (!devices) {
            return res.status(404).json({ message: "Devices not found." });
        }

        return res
            .status(200)
            .json({ devices: devices.rows, devicesCount: devices.count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const removeUserDevice = async (req, res) => {
    try {
        const { id } = req.params;

        const device = await UserDevice.findByPk(id);

        if (!device) {
            return res.status(404).json({ message: "Device not found." });
        }
        if (device.userId !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized." });
        }

        await device.destroy();

        return res
            .status(200)
            .json({ message: "Device deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export default { getUserDevices, removeUserDevice };
