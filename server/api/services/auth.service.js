import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../../config/index.js";
import logActions from "../../config/logActions.js";
import db from "../../models/index.js";
import logActivity from "./helpers/logActivity.js";
import updateLastLoginDate from "./helpers/updateLastLogin.js";
import validations from "./validations/authValidations.js";

const User = db.user;

const registerUser = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;

        if (!username || !password || !confirmPassword) {
            return res.status(400).json({
                message:
                    "Username and password and confirm password are required",
            });
        }
        const lowerUsername = username.toLowerCase();
        const checkUser = await User.findOne({
            where: { username: lowerUsername },
        });

        if (checkUser) {
            return res
                .status(400)
                .json({ message: "Username already exists." });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        validations.validateUsername(username);

        validations.validatePassword(password);

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create(
            {
                username: lowerUsername,
                password: hashedPassword,
            },
            {
                fields: ["username", "password"],
            },
        );
        await logActivity(logActions.register, newUser, null);

        res.status(200).json({
            message: "User Created Successfully.",
            newUser,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Username and password are required." });
        }

        const lowerUsername = username.toLowerCase();
        const user = await User.findOne({
            where: { username: lowerUsername },
        });

        if (!user) {
            return res.status(400).json({ message: "User does not exist." });
        }

        if (user.status === "pending" || user.status === "inactive") {
            return res.status(400).json({ message: "User is not active." });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            return res.status(400).json({ message: "Incorrect credentials." });
        }
        const { password: _, ...userWithoutPassword } = user.toJSON();
        const token = jwt.sign(
            { user: userWithoutPassword },
            config.jwtSecret,
            {
                expiresIn: "1d",
            },
        );

        const targetUserData = {
            id: userWithoutPassword.id,
            username: userWithoutPassword.username,
            role: userWithoutPassword.role,
            status: userWithoutPassword.status,
        };

        await logActivity(logActions.login, targetUserData);

        await updateLastLoginDate(user);

        res.status(200).json({
            message: "Login successful.",
            token,
            user: userWithoutPassword,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        const user = req.user;

        const lowerUsername = user.username.toLowerCase();
        const userCheck = await User.findOne({
            where: { username: lowerUsername },
        });

        if (!userCheck) {
            return res.status(400).json({ message: "User does not exist." });
        }

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                message:
                    "Current password, new password and confirm password are required",
            });
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        const correctPassword = await bcrypt.compare(
            currentPassword,
            userCheck.password,
        );

        if (!correctPassword) {
            return res.status(400).json({ message: "Incorrect credentials." });
        }

        validations.validatePassword(newPassword);

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await userCheck.update({ password: hashedPassword });
        await logActivity(logActions.changePassword, userCheck, null);

        res.status(200).json({ message: "Password changed successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { registerUser, loginUser, changePassword };
