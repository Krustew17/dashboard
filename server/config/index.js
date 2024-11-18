import * as dotenv from "dotenv";

const nodeEnv = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error && nodeEnv == "development") {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    // Port used by the server
    port: parseInt(process.env.APP_PORT),

    // JWT secret key
    jwtSecret: process.env.JWT_SECRET,

    // API
    api: {
        prefix: "/api",
    },
};
