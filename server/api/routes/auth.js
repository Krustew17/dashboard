import { Router } from "express";

import { loginUser, registerUser } from "../controllers/auth.controller.js";
import middlewares from "../middleware/index.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", middlewares.checkUserDevice, loginUser);

export default router;
