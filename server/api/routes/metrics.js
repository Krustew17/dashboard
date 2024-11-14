import { Router } from "express";

import {
    getActiveUserCount,
    getLoginsCount,
    getUserRegisterCount,
} from "../controllers/metrics.controller.js";

const router = Router();

router.get("/users/active", getActiveUserCount);
router.get("/logins", getLoginsCount);
router.get("/registers", getUserRegisterCount);

export default router;
