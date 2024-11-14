import { useEffect, useState } from "react";
import requester from "../common/requester";
import TableHead from "./TableHead";
import TableRow from "./TableRow.jsx";
import EditDocumentModal from "./EditDocumentModal.jsx";
import DeleteDocumentModal from "./DeleteDocumentModal.jsx";
import apiEndPoints from "../config/apiEndpoints";
import { documentsTableValues } from "../constants/documentsTableValues.js";
import documentStatusPropClasses from "../constants/documentStatusPropClasses.js";

const DOCUMENTS_TABLE_HEAD = documentsTableValues.map(
    (item) => Object.values(item)[0].title
);

const DOCUMENTS_TABLE_ROWS_PROPS = documentsTableValues.map(
    (item) => Object.values(item)[0].prop
);

export default function documentsTable() {
    const [documents, setdocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDocument, setselectedDocument] = useState(null);

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    };

    const handleEditClick = (document) => {
        console.log(document);
        setselectedDocument(document);
        toggleEditModal();
    };

    const toggleDeleteModal = (document) => {
        setselectedDocument(document);
        setDeleteModalOpen(!deleteModalOpen);
    };

    const handleSave = (updateddocument) => {
        setdocuments((prevdocuments) =>
            prevdocuments.map((document) =>
                document.id === updateddocument.id ? updateddocument : document
            )
        );
    };

    const handleDelete = (documentId) => {
        setdocuments((prevdocuments) =>
            prevdocuments.filter((document) => document.id !== documentId)
        );
    };

    const fetchdocuments = async () => {
        try {
            const { responseJson, response } = await requester(
                apiEndPoints.documents.all.url,
                {
                    method: apiEndPoints.documents.all.method,
                },
                true
            );

            setdocuments(responseJson.documents || []);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch documents");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchdocuments();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <TableHead tableHead={DOCUMENTS_TABLE_HEAD} />
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
}
