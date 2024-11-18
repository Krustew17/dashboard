import * as dotenv from "dotenv";
import express from "express";

import appConfig from "./config/appConfig.js";
import config from "./config/index.js";
import db from "./models/index.js";

dotenv.config();

async function startServer() {
    const app = express();
    appConfig(app);
    db.sequelize
        .sync()
        .then(() => {
            console.log("Tables have been synchronized successfully.");
        })
        .catch((err) => {
            console.log("Something went wrong synchronizing tables.");
        });
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    }).on("error", (err) => {
        console.error(err);
        process.exit(1);
    });
}

startServer();
