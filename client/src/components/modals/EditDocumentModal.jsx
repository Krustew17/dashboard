import React, { useState } from "react";
import requester from "../../common/requester";
import apiEndpoints from "../../config/apiEndpoints";
import { documentStatuses } from "../../constants/documentStatuses";

const DocumentEditModal = ({ isOpen, document, toggleModal, onSave }) => {
    if (!isOpen || !document) return null;

    const [title, setTitle] = useState(document.title || "");
    const [status, setStatus] = useState(document.status);
    const [errors, setErrors] = useState();

    const handleSave = () => {
        onSave({ ...document, title, status });
        toggleModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            title,
            status,
        };

        try {
            const { responseJson, response } = await requester(
                `${apiEndpoints.documents.update.url}/${document.id}`,
                {
                    method: apiEndpoints.documents.update.method,
                    body: body,
                },
                true
            );

            if (response.ok) {
                setTitle("");

                handleSave();
            } else {
                setErrors(responseJson);
            }
        } catch (error) {
            setErrors({ message: "An error occurred. Please try again." });
        }
    };
    const handleChange = (e) => {
        setTitle(e.target.value);
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
                    <h2 className="text-2xl mb-2">Edit document</h2>
                </div>
                <div className="mt-2">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => handleChange(e)}
                        className="border p-1 w-full bg-stone-700"
                    />
                </div>
                <div className="mt-2">
                    <label>Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border p-1 w-full bg-stone-700 hover:cursor-pointer cursor-pointer"
                    >
                        {Object.values(documentStatuses).map((status) => {
                            return (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            );
                        })}
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

export default DocumentEditModal;
