import { useEffect, useState } from "react";
import requester from "../common/requester";
import TableHead from "./TableHead";
import TableRow from "./TableRow.jsx";
import EditDocumentModal from "./modals/EditDocumentModal.jsx";
import DeleteDocumentModal from "./modals/DeleteDocumentModal.jsx";
import CreateDocumentModal from "./modals/CreateDocumentModal.jsx";
import apiEndPoints from "../config/apiEndpoints";
import { documentsTableValues } from "../constants/documentsTableValues.js";
import documentStatusPropClasses from "../constants/documentStatusPropClasses.js";

const DOCUMENTS_TABLE_HEAD = documentsTableValues.map(
    (item) => Object.values(item)[0].title
);

const DOCUMENTS_TABLE_ROWS_PROPS = documentsTableValues.map(
    (item) => Object.values(item)[0].prop
);

const documentsTable = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [showCreateDocumentModal, setShowCreateDocumentModal] =
        useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDocument, setselectedDocument] = useState(null);

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    };

    const handleEditClick = (document) => {
        setselectedDocument(document);
        toggleEditModal();
    };

    const toggleDeleteModal = (document) => {
        setselectedDocument(document);
        setDeleteModalOpen(!deleteModalOpen);
    };

    const handleSave = (updatedDocument) => {
        setDocuments((prevDocuments) =>
            prevDocuments.map((document) =>
                document.id === updatedDocument.id ? updatedDocument : document
            )
        );
    };

    const handleDelete = () => {
        fetchDocuments();
    };
    const handleCreate = (document) => {
        setDocuments((prevdocuments) => [...prevdocuments, document]);
    };

    const fetchDocuments = async () => {
        try {
            const { responseJson, response } = await requester(
                apiEndPoints.documents.all.url,
                {
                    method: apiEndPoints.documents.all.method,
                },
                true
            );

            setDocuments(responseJson.documents || []);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch documents");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);
    const toggleCreateDocumentModal = () => {
        setShowCreateDocumentModal(!showCreateDocumentModal);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <TableHead
                    tableHead={DOCUMENTS_TABLE_HEAD}
                    onAddNewClick={toggleCreateDocumentModal}
                />
                <tbody>
                    {documents.map((document) => {
                        return (
                            <TableRow
                                key={document.id}
                                entity={document}
                                entityProps={DOCUMENTS_TABLE_ROWS_PROPS}
                                entityStatusClasses={documentStatusPropClasses}
                                onEditClick={() => handleEditClick(document)}
                                onDeleteClick={() =>
                                    toggleDeleteModal(document)
                                }
                            />
                        );
                    })}
                </tbody>
            </table>
            <CreateDocumentModal
                isOpen={showCreateDocumentModal}
                toggleModal={toggleCreateDocumentModal}
                onCreate={handleCreate}
            />

            <DeleteDocumentModal
                isOpen={deleteModalOpen}
                document={selectedDocument}
                toggleDeleteModal={toggleDeleteModal}
                onDelete={handleDelete}
            />
            <EditDocumentModal
                isOpen={editModalOpen}
                document={selectedDocument}
                toggleModal={toggleEditModal}
                onSave={handleSave}
            />
        </div>
    );
};
export default documentsTable;
