import { Router } from "express";

import {
    changePassword,
    loginUser,
    refreshToken,
    registerUser,
} from "../controllers/auth.controller.js";
import middlewares from "../middleware/index.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", middlewares.checkUserDevice, loginUser);
router.post("/refresh-token", refreshToken);
router.post(
    "/change-password",
    middlewares.verifyToken,
    middlewares.attachUser,
    changePassword,
);

export default router;
