import { decode } from "jsonwebtoken";

import getTokenFromHeader from "./getTokenFromHeader.js";

const attachUser = async (req, res, next) => {
    const token = getTokenFromHeader(req, res, next);
    if (!token) {
        return res.status(401).json({ message: "unauthenticated" });
    }
    let user = decode(token);
    if (user && user.password) {
        delete user.password;
    }
    req.user = user.user;
    next();
};

export default attachUser;
