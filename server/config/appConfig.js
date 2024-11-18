import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import registerRoutes from "../api/routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

const appConfig = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    registerRoutes(app);
    app.use(cors(corsOptions));
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept",
        );
        next();
    });

    app.use(
        express.static(path.join(__dirname, "../../client/dist"), {
            setHeaders: (res, path) => {
                res.set("Cache-Control", "public, max-age=0");
            },
        }),
    );

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
    });
};
export default appConfig;
