import * as dotenv from "dotenv";
import express from "express";

import config from "./config/index.js";
import setupMySql from "./loaders/mysql.js";

dotenv.config();

async function startServer() {
  const app = express();

  await setupMySql({ expressApp: app });

  app
    .listen(config.port, () => {
      console.log(
        `**********************************************
      Server running on port ${config.port}
      **********************************************`,
      );
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
}

startServer();
