import { Sequelize } from "sequelize";

import dbConfig from "../config/dbConfig.js";
import Document from "./documentModel.js";
import Logs from "./logsModel.js";
import UserDevice from "./userDeviceModel.js";
import User from "./userModel.js";

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.max,
            min: dbConfig.min,
            acquire: dbConfig.acquire,
            idle: dbConfig.idle,
        },
    },
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.log("Error connecting to the database" + err);
    });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = User(sequelize, Sequelize);
db.auditLog = Logs(sequelize, Sequelize);

db.document = Document(sequelize, Sequelize);

db.userDevice = UserDevice(sequelize, Sequelize);

export default db;
