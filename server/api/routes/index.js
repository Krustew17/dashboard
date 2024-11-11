import config from "../../config/index.js";
import userRoutes from "./user.js";

const prefix = config.api.prefix;

const registerRoutes = (app) => {
  app.use(`${prefix}/users`, userRoutes);
};

export default registerRoutes;
