import { Router } from "express";

import {
    deleteUser,
    editUser,
    getAllUsers,
} from "../controllers/user.controller.js";
import checkPermissions from "../middleware/checkPermissions.js";

const router = Router();

router.get("/", getAllUsers);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);

export default router;
