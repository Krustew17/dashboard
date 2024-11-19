import { Router } from "express";

import {
    changePassword,
    loginUser,
    registerUser,
} from "../controllers/auth.controller.js";
import middlewares from "../middleware/index.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", middlewares.checkUserDevice, loginUser);
router.post("/change-password", changePassword);

export default router;
