import { Op } from "sequelize";

import logActions from "../../config/logActions.js";
import db from "../../models/index.js";
import validations from "./validations/validTimeframe.js";

const User = db.user;
const AuditLog = db.auditLog;

const getActiveUserCount = async (req, res) => {
    try {
        const count = await User.count({
            where: { status: "active" },
        });
        return res.status(200).json({ activeUsersCount: count });
    } catch (err) {
        console.log(err);
    }
};

const getLoginsCount = async (req, res) => {
    try {
        const { timeframe } = req.query;
        const validTimeframe = validations.validateTimeframe(timeframe);

        const logs = await AuditLog.findAndCountAll({
            where: {
                action: logActions.login,
                createdAt: { [Op.gte]: validTimeframe },
            },
        });
        return res.status(200).json({ loginsCount: logs.count });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export default { getActiveUserCount, getLoginsCount };
