import { Router } from "express";

import { getAllLogs, trackRoute } from "../controllers/logs.controller.js";

const router = Router();

router.get("/all", getAllLogs);
router.post("/track-route", trackRoute);

export default router;
