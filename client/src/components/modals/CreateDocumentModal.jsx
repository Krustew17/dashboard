import React, { useState } from "react";
import requester from "../../common/requester";
import apiEndpoints from "../../config/apiEndpoints";

const CreateDocumentModal = ({ isOpen, toggleModal, onCreate }) => {
    const [title, setTitle] = useState("");
    const [erorrs, setErrors] = useState();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { response, responseJson } = await requester(
                apiEndpoints.documents.create.url,
                {
                    method: apiEndpoints.documents.create.method,
                    body: { title },
                },
                true
            );

            if (!response.ok) {
                setErrors(responseJson.message);
                return;
            }

            onCreate(responseJson.document);
            setTitle("");
            toggleModal();
        } catch (error) {
            console.error("Error creating document:", error);
            setErrors("Error creating document. Please try again.");
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={toggleModal}
        >
            <div
                className="bg-stone-800 p-4 rounded-md min-w-[300px]"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl mb-4 text-center">Create Document</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded bg-stone-700 text-white"
                            placeholder="Enter document title"
                        />
                    </div>
                    {erorrs && <p className="text-red-500">{erorrs}</p>}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={toggleModal}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDocumentModal;
