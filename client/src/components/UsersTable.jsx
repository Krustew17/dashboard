import { useEffect, useState } from "react";
import requester from "../common/requester";
import TableHead from "./TableHead";
import TableRow from "./TableRow.jsx";
import EditUserModal from "./modals/EditUserModal.jsx";
import DeleteUserModal from "./modals/DeleteUserModal";
import apiEndPoints from "../config/apiEndpoints";
import { usersTableValues } from "../constants/usersTableValues.js";
import userStatusPropClasses from "../constants/userStatusPropClasses.js";

const USERS_TABLE_HEAD = usersTableValues.map(
    (item) => Object.values(item)[0].title
);

const USRERS_TABLE_ROW_PROPS = usersTableValues.map(
    (item) => Object.values(item)[0].prop
);

export default function UsersTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        toggleEditModal();
    };

    const toggleDeleteModal = (user) => {
        setSelectedUser(user);
        setDeleteModalOpen(!deleteModalOpen);
    };

    const handleSave = (updatedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            )
        );
    };

    const handleDelete = (userId) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    };

    const fetchUsers = async () => {
        try {
            const { responseJson, response } = await requester(
                apiEndPoints.users.all.url,
                {
                    method: apiEndPoints.users.all.method,
                },
                true
            );

            setUsers(responseJson.users || []);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch users");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

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
            <DeleteUserModal
                isOpen={deleteModalOpen}
                user={selectedUser}
                toggleDeleteModal={toggleDeleteModal}
                onDelete={handleDelete}
            />
            <EditUserModal
                isOpen={editModalOpen}
                user={selectedUser}
                toggleModal={toggleEditModal}
                onSave={handleSave}
            />
        </div>
    );
}
