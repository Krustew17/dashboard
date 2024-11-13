import React, { useState } from "react";
import requester from "../common/requester";
import apiEndpoints from "../config/apiEndpoints";

const DeleteModal = ({ isOpen, user, toggleDeleteModal, onDelete }) => {
    if (!isOpen || !user) return null;
    const [errors, setErrors] = useState();

    const handleDelete = async () => {
        try {
            const { responseJson, response } = await requester(
                `${apiEndpoints.users.deleteUser.url}/${user.id}`,
                {
                    method: apiEndpoints.users.deleteUser.method,
                }
            );
            if (response.ok) {
                onDelete(user.id);
                toggleDeleteModal();
            }
        } catch (error) {
            setErrors({ message: "An error occurred. Please try again." });
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={toggleDeleteModal}
        >
            <div
                className="bg-stone-800 p-4 rounded-md min-w-[250px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-center items-center mb-2">
                    <h2 className="text-2xl font-bold mb-2">
                        Confirm Deletion
                    </h2>
                </div>
                <div className="mt-2">
                    <p className="text-white text-center">
                        Are you sure you want to delete the user <br />
                        <strong className="text-red-500 hover:text-red-600 cursor-default">
                            {user.username}
                        </strong>
                        ?
                    </p>
                </div>
                {errors && <p className="text-red-500">{errors.message}</p>}
                <div className="mt-4 flex gap-3 justify-end">
                    <button
                        onClick={toggleDeleteModal}
                        type="button"
                        className="bg-indigo-500 p-1 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        type="button"
                        className="bg-red-500 p-1 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
