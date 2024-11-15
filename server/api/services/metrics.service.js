import { Op, col, fn, literal } from "sequelize";

import logActions from "../../config/logActions.js";
import db from "../../models/index.js";
import validations from "./validations/validTimeframe.js";

const User = db.user;
const AuditLog = db.auditLog;
const ViewedPagesLog = db.viewedPagesLogs;

const sequelize = db.sequelize;

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
            registrations: log.dataValues.dailyCount,
        }));

        return res.status(200).json({ registersCount: result });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const getRolesActivity = async (req, res) => {
    try {
        const { timeframe } = req.query;
        const validTimeframe = validations.validateTimeframe(timeframe);

        const logs = await sequelize.query(
            `
            SELECT 
                DATE(createdAt) AS date,
                SUM(CASE WHEN JSON_UNQUOTE(JSON_EXTRACT(performedByUserData, '$.role')) = 'admin' THEN 1 ELSE 0 END) AS admin,
                SUM(CASE WHEN JSON_UNQUOTE(JSON_EXTRACT(performedByUserData, '$.role')) = 'updater' THEN 1 ELSE 0 END) AS updater,
                SUM(CASE WHEN JSON_UNQUOTE(JSON_EXTRACT(performedByUserData, '$.role')) = 'viewer' THEN 1 ELSE 0 END) AS viewer
            FROM audit_logs
            WHERE createdAt >= :validTimeframe
            GROUP BY date
            ORDER BY date ASC
            `,
            {
                replacements: { validTimeframe },
                type: sequelize.QueryTypes.SELECT,
            },
        );

        return res.status(200).json({ groupedLogs: logs });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const mostViewedPage = async (req, res) => {
    try {
        let { timeframe } = req.query;
        if (!timeframe) {
            timeframe = "1d";
        }

        const validTimeframe = validations.validateTimeframe(timeframe);

        const result = await ViewedPagesLog.findAll({
            attributes: ["page", [fn("COUNT", col("page")), "viewCount"]],
            group: ["page"],
            where: {
                createdAt: { [Op.gte]: validTimeframe },
            },
            order: [[fn("COUNT", col("page")), "DESC"]],
        });

        return res.status(200).json({ mostViewedPage: result[0] });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const pageViewsCount = async (req, res) => {
    try {
        const { timeframe } = req.query;
        const validTimeframe = validations.validateTimeframe(timeframe);

        const result = await ViewedPagesLog.findAll({
            attributes: ["page", [fn("COUNT", col("page")), "viewCount"]],
            where: {
                createdAt: { [Op.gte]: validTimeframe },
            },
            group: ["page"],
            order: [[fn("COUNT", col("page")), "DESC"]],
        });

        return res.status(200).json({ pageViewsCount: result });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export default {
    getActiveUserCount,
    getLoginsCount,
    getUserRegisterCount,
    getRolesActivity,
    mostViewedPage,
    pageViewsCount,
};
