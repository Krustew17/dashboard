import config from "../../config/index.js";
import middlewares from "../middleware/index.js";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";

const prefix = config.api.prefix;

const registerRoutes = (app) => {
    app.use(
        `${prefix}/users`,
        middlewares.verifyToken,
        middlewares.attachUser,
        userRoutes,
    );
    app.use(`${prefix}/auth`, authRoutes);
};

export default registerRoutes;
