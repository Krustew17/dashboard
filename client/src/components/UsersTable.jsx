import { useEffect, useState } from "react";
import requester from "../common/requester";
import UsersTableHead from "./UsersTableHead";
import UsersTableRow from "./UsersTableRow";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

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
        console.log(user);
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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { responseJson } = await requester("users", {
                    method: "GET",
                });
                setUsers(responseJson.users || []);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch users");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <UsersTableHead />
                <tbody>
                    {users.map((user) => {
                        return (
                            <UsersTableRow
                                key={user.id}
                                user={user}
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
