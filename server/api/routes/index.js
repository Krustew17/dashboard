import config from "../../config/index.js";
import middlewares from "../middleware/index.js";
import authRoutes from "./auth.js";
import documentRoutes from "./documents.js";
import metricsRoutes from "./metrics.js";
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
    app.use(`${prefix}/metrics`, metricsRoutes);
    app.use(
        `${prefix}/documents`,
        middlewares.verifyToken,
        middlewares.attachUser,
        documentRoutes,
    );
};

export default registerRoutes;
