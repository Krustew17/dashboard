import React, { useState } from "react";
import requester from "../../common/requester";
import apiEndpoints from "../../config/apiEndpoints";
import { userStatuses } from "../../constants/userStatuses";
import { userRoles } from "../../constants/userRoles";

const UserEditModal = ({ isOpen, user, toggleModal, onSave }) => {
    if (!isOpen || !user) return null;

    const [role, setRole] = useState(user.role);
    const [status, setStatus] = useState(user.status);
    const [errors, setErrors] = useState();

    const handleSave = () => {
        onSave({ ...user, role, status });
        toggleModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            role,
            status,
        };

        try {
            const { responseJson, response } = await requester(
                `${apiEndpoints.users.update.url}/${user.id}`,
                {
                    method: apiEndpoints.users.update.method,
                    body: body,
                },
                true
            );

            if (response.ok) {
                handleSave();
            } else {
                setErrors(responseJson);
            }
        } catch (error) {
            setErrors({ message: "An error occurred. Please try again." });
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={toggleModal}
        >
            <form
                className="bg-stone-800 p-4 rounded-md min-w-[250px]"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
            >
                <div className="flex justify-center items-center mb-2">
                    <h2 className="text-2xl mb-2">Edit User</h2>
                </div>
                <div className="mt-2">
                    <label>Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border p-1 w-full bg-stone-700"
                    >
                        {Object.values(userRoles).map((role) => (
                            <option key={role.value} value={role.value}>
                                {role.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-2">
                    <label>Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border p-1 w-full bg-stone-700 hover:cursor-pointer cursor-pointer"
                    >
                        {Object.values(userStatuses).map((status) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </div>

                {errors && <div className="text-red-500">{errors.message}</div>}

                <div className="mt-4 flex gap-3 justify-end">
                    <button
                        onClick={toggleModal}
                        type="button"
                        className="bg-red-500 px-3 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-indigo-500 p-1 rounded px-3"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserEditModal;
