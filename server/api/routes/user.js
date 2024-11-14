import { Router } from "express";

import {
    deleteUser,
    editUser,
    getUsers,
} from "../controllers/user.controller.js";
import middlewares from "../middleware/index.js";

const router = Router();

router.get("/", getUsers);
router.put(
    "/edit/:id",
    middlewares.checkPermissions(["manage_users"]),
    editUser,
);
router.delete(
    "/delete/:id",
    middlewares.checkPermissions(["manage_users"]),
    deleteUser,
);

export default router;
