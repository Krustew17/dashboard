import { Router } from "express";

import { getUserDevices } from "../controllers/userDevices.controller.js";

const router = Router();

router.get("/", getUserDevices);

export default router;
