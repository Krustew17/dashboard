import { Router } from "express";

import {
    deleteUserDevice,
    getUserDevices,
} from "../controllers/userDevices.controller.js";

const router = Router();

router.get("/", getUserDevices);
router.delete("/delete/:id", deleteUserDevice);

export default router;
