import React, { useState } from "react";
import requester from "../common/requester";
import apiEndpoints from "../config/apiEndpoints";

const UserEditModal = ({ isOpen, user, toggleModal, onSave }) => {
    if (!isOpen || !user) return null;

    const [role, setRole] = useState(user.role);
    const [status, setStatus] = useState(user.status);
    const [errors, setErrors] = useState();

    const handleSave = () => {
        onSave({ ...user, role, status });
        toggleModal(); // Close modal after saving
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            role,
            status,
        };

        try {
            const { responseJson, response } = await requester(
                `${apiEndpoints.users.editUser.url}/${user.id}`,
                {
                    method: "PUT",
                    body: body,
                }
            );

            if (response.ok) {
                console.log(responseJson); // handle success
                handleSave(); // Call onSave and close modal
            } else {
                // Handle server-side validation errors (for example, if the user role is invalid)
                setErrors(responseJson); // Assuming responseJson contains error messages
            }
        } catch (error) {
            setErrors({ message: "An error occurred. Please try again." }); // handle network or server errors
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={toggleModal}
        >
            <form
                className="bg-stone-800 p-4 rounded-md min-w-[250px]"
                onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside form
                onSubmit={handleSubmit}
            >
                <div className="flex justify-center items-center mb-2">
                    <h2 className="text-2xl mb-2">Edit User</h2>
                </div>
                <div className="mt-2">
                    <label>Role</label>
                    <select
                        value={user.role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border p-1 w-full bg-stone-700"
                    >
                        <option value="admin">Admin</option>
                        <option value="updater">Updater</option>
                        <option value="viewer">Viewer</option>
                        <option value="sed1">SED1</option>
                    </select>
                </div>
                <div className="mt-2">
                    <label>Status</label>
                    <select
                        value={user.status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border p-1 w-full bg-stone-700 hover:cursor-pointer cursor-pointer"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
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
                        type="submit" // Form submit button, no need for onClick here
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
