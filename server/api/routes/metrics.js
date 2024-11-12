import { Router } from "express";

import {
    getActiveUserCount,
    getLoginsCount,
} from "../controllers/metrics.controller.js";

const router = Router();

router.get("/users/active", getActiveUserCount);
router.get("/logins", getLoginsCount);

export default router;
