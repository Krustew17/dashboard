import TableHead from "./TableHead";
import TableRow from "./TableRow.jsx";
import CreateDocumentModal from "./modals/CreateDocumentModal.jsx";
import apiEndPoints from "../config/apiEndpoints";
import { documentsTableValues } from "../constants/documentsTableValues.js";
import documentStatusPropClasses from "../constants/documentStatusPropClasses.js";
import useFetchEntity from "../components/hooks/useFetchEntity.jsx";
import useToggleModal from "../components/hooks/useToggleModal.jsx";
import validEntityTypes from "../constants/validEntityTypes.js";
import DeleteEntityModal from "./modals/DeleteEntityModal.jsx";
import EditEntityModal from "./modals/EditEntityModal.jsx";
import { editDocumentsModalConfig } from "../config/editModalConfigs.js";

const DOCUMENTS_TABLE_HEAD = documentsTableValues.map(
    (item) => Object.values(item)[0].title
);

const DOCUMENTS_TABLE_ROWS_PROPS = documentsTableValues.map(
    (item) => Object.values(item)[0].prop
);

const documentsTable = ({ documents, loading, error, handleAction }) => {
    const {
        selectedEntity,
        toggleCreateModal,
        toggleDeleteModal,
        handleEditClick,
        toggleEditModal,
        editModalOpen,
        deleteModalOpen,
        createModalOpen,
    } = useToggleModal();

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2 mb-2">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <TableHead
                    tableHead={DOCUMENTS_TABLE_HEAD}
                    onAddNewClick={toggleCreateModal}
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
                isOpen={createModalOpen}
                toggleModal={toggleCreateModal}
                onCreate={handleAction}
            />

            <DeleteEntityModal
                isOpen={deleteModalOpen}
                entity={selectedEntity}
                toggleModal={toggleDeleteModal}
                onDelete={handleAction}
                type={validEntityTypes.documents}
            />
            <EditEntityModal
                isOpen={editModalOpen}
                entity={selectedEntity}
                toggleModal={toggleEditModal}
                onSave={handleAction}
                fieldsConfig={editDocumentsModalConfig}
                url={apiEndPoints.documents.update.url}
                method={apiEndPoints.documents.update.method}
            />
        </div>
    );
};
export default documentsTable;
