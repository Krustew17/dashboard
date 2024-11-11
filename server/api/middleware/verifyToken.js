import jwt from "jsonwebtoken";

import config from "../../config/index.js";
import getTokenFromHeader from "./getTokenFromHeader.js";

const verifyToken = (req, res, next) => {
    try {
        const token = getTokenFromHeader(req, res, next);
        if (!token) {
            return res.status(401).json({ message: "unauthenticated" });
        }
        jwt.verify(token, config.jwtSecret, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "unauthorized" });
            }
            next();
        });
    } catch (err) {
        console.log(err);
    }
};

export default verifyToken;
