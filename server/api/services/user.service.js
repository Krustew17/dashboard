import { DEFAULT_PAGE_LIMIT } from "../../config/constants.js";
import logActions from "../../config/logActions.js";
import db from "../../models/index.js";
import logActivity from "./helpers/logActivity.js";
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

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, role } = req.body;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await updateUser(user, { status, role });

        const targetUserData = {
            id: user.id,
            username: user.username,
            role: user.role,
            status: user.status,
        };

        await logActivity(req.user, targetUserData, logActions.update);

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

        const targetUserData = {
            id: user.id,
            username: user.username,
            role: user.role,
            status: user.status,
        };

        await logActivity(targetUserData, logActions.delete, req.user); // could be done as middleware

        await user.destroy();

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.log(err);
    }
};

export default { getAllUsers, editUser, deleteUser };
