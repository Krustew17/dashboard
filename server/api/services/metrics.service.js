import { Op, col, fn, literal } from "sequelize";

import logActions from "../../config/logActions.js";
import defaultTimeframes from "../../constants/defaultTimeframes.js";
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
        let { timeframe } = req.query;
        if (!timeframe) {
            timeframe = defaultTimeframes.loginsCount;
        }
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
        const startDate = new Date() - 6 * 24 * 60 * 60 * 1000;
        const endDate = new Date();

        const logs = await sequelize.query(
            `
            SELECT 
                DATE(createdAt) AS date,
                COUNT(*) AS dailyCount
            FROM audit_logs
            WHERE createdAt BETWEEN :startDate AND :endDate
            AND action = 'has registered'
            GROUP BY date
            ORDER BY date ASC
            `,
            {
                replacements: { startDate, endDate },
                type: sequelize.QueryTypes.SELECT,
            },
        );

        const allDates = [];
        let currentDate = new Date(startDate);
        const end = new Date(endDate);

        while (currentDate <= end) {
            allDates.push(currentDate.toISOString().split("T")[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        const result = allDates.map((date) => {
            const log = logs.find((log) => log.date === date);
            return {
                date,
                registrations: log ? log.dailyCount : 0,
            };
        });

        return res.status(200).json({ registersCount: result });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const getRolesActivity = async (req, res) => {
    try {
        let { timeframe } = req.query;
        if (!timeframe) {
            timeframe = defaultTimeframes.rolesActivity;
        }

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);
        const endDate = new Date();

        const validTimeframe = validations.validateTimeframe(timeframe);

        const logs = await sequelize.query(
            `
            SELECT 
                DATE(createdAt) AS date,
                SUM(CASE WHEN JSON_UNQUOTE(JSON_EXTRACT(performedByUserData, '$.role')) = 'admin' THEN 1 ELSE 0 END) AS admin,
                SUM(CASE WHEN JSON_UNQUOTE(JSON_EXTRACT(performedByUserData, '$.role')) = 'updater' THEN 1 ELSE 0 END) AS updater,
                SUM(CASE WHEN JSON_UNQUOTE(JSON_EXTRACT(performedByUserData, '$.role')) = 'viewer' THEN 1 ELSE 0 END) AS viewer
            FROM audit_logs
            WHERE createdAt BETWEEN :startDate AND :endDate
            GROUP BY date
            ORDER BY date ASC
            `,
            {
                replacements: { startDate, endDate },
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
            timeframe = defaultTimeframes.mostViewedPage;
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
        let { timeframe } = req.query;
        if (!timeframe) {
            timeframe = defaultTimeframes.pageViewsCount;
        }
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
