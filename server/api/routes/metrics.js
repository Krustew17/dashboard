import { Router } from "express";

import {
    getActiveUserCount,
    getLoginsCount,
    getMostViewedPage,
    getPageViewsCount,
    getRolesActivity,
    getUserRegisterCount,
} from "../controllers/metrics.controller.js";

const router = Router();

router.get("/users/active", getActiveUserCount);
router.get("/logins", getLoginsCount);
router.get("/registers", getUserRegisterCount);
router.get("/roles/activity", getRolesActivity);
router.get("/page/most-viewed", getMostViewedPage);
router.get("/page/views", getPageViewsCount);

export default router;
