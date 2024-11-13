import cors from "cors";
import express from "express";

const appConfig = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept",
        );
        next();
    });
};

export default appConfig;
