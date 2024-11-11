import { DEFAULT_PAGE_LIMIT } from "../../config/constants.js";
import db from "../../models/index.js";

const User = db.user;

const getAllUsers = async (req, res) => {
    try {
        const { page } = req.query;
        const limit = req.query.limit || DEFAULT_PAGE_LIMIT;

        const offset = (page - 1) * limit;

        const users = await User.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        if (!users) {
            return res.status(404).json({ message: "No users found" });
        }

        return res
            .status(200)
            .json({ users: users.rows, count: users.rows.length });
    } catch (err) {
        console.log(err);
    }
};

export default { getAllUsers };
