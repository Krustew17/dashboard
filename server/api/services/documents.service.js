import { USERS_PAGE_LIMIT } from "../../config/constants.js";
import logActions from "../../config/logActions.js";
import db from "../../models/index.js";
import logActivity from "./helpers/logActivity.js";
import updateDocument from "./helpers/updateDocument.js";

const Document = db.document;

const getDocuments = async (req, res) => {
    try {
        let { page } = req.query;

        if (!page) {
            page = 1;
        }

        const limit = req.query.limit || USERS_PAGE_LIMIT;

        const offset = (page - 1) * limit;

        const documents = await Document.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        if (!documents) {
            return res.status(404).json({ message: "No documents found." });
        }

        return res
            .status(200)
            .json({ documents: documents.rows, count: documents.rows.length });
    } catch (err) {
        console.log(err);
    }
};

const createDocument = async (req, res) => {
    try {
        const { title, status } = req.body;
        const performedByUser = req.user;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        const updatedBy = {
            id: req.user.id,
            username: req.user.username,
            role: req.user.role,
        };

        const document = await Document.create({ title, status, updatedBy });

        await logActivity(logActions.uploadDoc, document, performedByUser);

        return res.status(200).json({ document });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const editDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, status } = req.body;
        const performedByUser = req.user;

        const updatedBy = {
            id: req.user.id,
            username: req.user.username,
            role: req.user.role,
        };

        const document = await updateDocument(id, { title, status, updatedBy });

        await logActivity(logActions.updateDoc, document, performedByUser);

        return res.status(200).json({
            message: "Document updated successfully.",
            updatedDocument: document,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findByPk(id);
        const performedByUser = req.user;

        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        await document.destroy();

        await logActivity(logActions.deleteDoc, document, performedByUser);

        return res
            .status(200)
            .json({ message: "Document deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export default {
    createDocument,
    getDocuments,
    editDocument,
    deleteDocument,
};
