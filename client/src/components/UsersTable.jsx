import TableHead from "./TableHead";
import TableRow from "./TableRow.jsx";
import EditUserModal from "./modals/EditUserModal.jsx";
import apiEndPoints from "../config/apiEndpoints";
import { usersTableValues } from "../constants/usersTableValues.js";
import userStatusPropClasses from "../constants/userStatusPropClasses.js";
import useFetchEntity from "./hooks/useFetchEntity.jsx";
import useToggleModal from "./hooks/useToggleModal.jsx";
import validEntityTypes from "../constants/validEntityTypes.js";
import DeleteEntityModal from "./modals/DeleteEntityModal.jsx";
import EditEntityModal from "./modals/EditEntityModal.jsx";
import { editUsersModalConfig } from "../config/editModalConfigs.js";

const USERS_TABLE_HEAD = usersTableValues.map(
    (item) => Object.values(item)[0].title
);

const USRERS_TABLE_ROW_PROPS = usersTableValues.map(
    (item) => Object.values(item)[0].prop
);

export default function UsersTable() {
    const {
        entities: users,
        loading,
        error,
        refetch,
    } = useFetchEntity(
        validEntityTypes.users,
        apiEndPoints.users.all.url,
        apiEndPoints.users.all.method
    );

    const {
        selectedEntity,
        toggleDeleteModal,
        handleEditClick,
        toggleEditModal,
        editModalOpen,
        deleteModalOpen,
    } = useToggleModal();

    const handleAction = () => {
        refetch();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <TableHead tableHead={USERS_TABLE_HEAD} />
                <tbody>
                    {users.map((user) => {
                        return (
                            <TableRow
                                key={user.id}
                                entity={user}
                                entityProps={USRERS_TABLE_ROW_PROPS}
                                entityStatusClasses={userStatusPropClasses}
                                onEditClick={() => handleEditClick(user)}
                                onDeleteClick={() => toggleDeleteModal(user)}
                            />
                        );
                    })}
                </tbody>
            </table>
            <DeleteEntityModal
                isOpen={deleteModalOpen}
                entity={selectedEntity}
                toggleModal={toggleDeleteModal}
                onDelete={handleAction}
                type={validEntityTypes.users}
            />
            <EditEntityModal
                isOpen={editModalOpen}
                entity={selectedEntity}
                toggleModal={toggleEditModal}
                onSave={handleAction}
                fieldsConfig={editUsersModalConfig}
                url={apiEndPoints.users.update.url}
                method={apiEndPoints.users.update.method}
            />
        </div>
    );
}
