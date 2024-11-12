import documentService from "../services/documents.service.js";

export const getDocuments = async (req, res) => {
    return documentService.getDocuments(req, res);
};

export const createDocument = async (req, res) => {
    return documentService.createDocument(req, res);
};

export const deleteDocument = async (req, res) => {
    return documentService.deleteDocument(req, res);
};

export const editDocument = async (req, res) => {
    return documentService.editDocument(req, res);
};
