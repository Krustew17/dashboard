import { LOGS_PAGE_LIMIT } from "../../config/constants.js";
import db from "../../models/index.js";

const AuditLog = db.auditLog;

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

        return res
            .status(200)
            .json({ logs: logs.rows, count: logs.rows.length });
    } catch (err) {
        console.log(err);
    }
};

export default { getAllLogs };
