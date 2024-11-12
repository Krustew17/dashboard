import { Router } from "express";

import {
    createDocument,
    deleteDocument,
    editDocument,
    getDocuments,
} from "../controllers/documents.controller.js";

const router = Router();

router.post("/create", createDocument);
router.get("/", getDocuments);
router.put("/update/:id", editDocument);
router.delete("/delete/:id", deleteDocument);

export default router;
