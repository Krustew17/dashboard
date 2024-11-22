import { LOGS_PAGE_LIMIT } from "../../config/constants.js";
import db from "../../models/index.js";
import validations from "../services/validations/validPage.js";

const AuditLog = db.auditLog;
const ViewedPagesLog = db.viewedPagesLogs;

const getAllLogs = async (req, res) => {
    try {
        let { page } = req.query;

        if (!page) {
            page = 1;
        }

        const limit = req.query.limit || LOGS_PAGE_LIMIT;

        const offset = (page - 1) * limit;

        const logs = await AuditLog.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["createdAt", "DESC"]],
        });

        if (!logs) {
            return res.status(404).json({ message: "No logs found." });
        }

        const totalPages = Math.ceil(logs.count / limit);

        return res.status(200).json({
            logs: logs.rows,
            count: logs.rows.length,
            totalPages,
            currentPage: parseInt(page),
        });
    } catch (err) {
        console.log(err);
    }
};

const saveViewedRoute = async (req, res) => {
    try {
        const { path } = req.body;
        const user = req.user;
        const validPage = validations.validPagePath(path);

        if (!validPage) {
            return res.status(404).json({ message: "Page not found." });
        }
        const log = {
            page: validPage,
            viewedBy: user,
        };

        await ViewedPagesLog.create(log);
        return res
            .status(200)
            .json({ message: "Page view saved successfully." });
    } catch (err) {
        console.log(err);
    }
};

export default { getAllLogs, saveViewedRoute };
