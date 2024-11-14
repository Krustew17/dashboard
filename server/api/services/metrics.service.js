import { Op, col, fn, literal } from "sequelize";

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

const getUserRegisterCount = async (req, res) => {
    try {
        const { timeframe } = req.query;
        const validTimeframe = validations.validateTimeframe(timeframe);

        // Fetch data grouped by day
        const logs = await AuditLog.findAll({
            attributes: [
                [fn("DATE", col("createdAt")), "registerDate"],
                [fn("COUNT", col("id")), "dailyCount"],
            ],
            where: {
                action: logActions.register,
                createdAt: { [Op.gte]: validTimeframe },
            },
            group: [literal("DATE(createdAt)")],
            order: [[literal("DATE(createdAt)"), "ASC"]],
        });

        // Format the result for response
        const result = logs.map((log) => ({
            date: log.dataValues.registerDate,
            count: log.dataValues.dailyCount,
        }));

        return res.status(200).json({ registerCounts: result });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export default {
    getActiveUserCount,
    getLoginsCount,
    getUserRegisterCount,
};
