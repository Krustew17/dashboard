import { Router } from "express";

import {
    deleteUserDevice,
    getUserDevices,
} from "../controllers/userDevices.controller.js";

const router = Router();

router.post("/", getUserDevices);
router.delete("/delete/:id", deleteUserDevice);

export default router;
