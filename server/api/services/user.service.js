import { DEFAULT_PAGE_LIMIT } from "../../config/constants.js";
import db from "../../models/index.js";
import updateUser from "./helpers/updateUser.js";

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

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, role } = req.body;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        updateUser(user, { status, role });

        await user.save();
        return res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        console.log(err);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.log(err);
    }
};

export default { getAllUsers, editUser, deleteUser, getActiveUserCount };
