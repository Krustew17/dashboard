import { Router } from "express";

import { getAllLogs } from "../controllers/logs.controller.js";

const router = Router();

router.get("/all", getAllLogs);

export default router;
