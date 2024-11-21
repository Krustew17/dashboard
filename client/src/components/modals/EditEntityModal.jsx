import React from "react";
import useEditEntity from "../hooks/useEditEntity";

const EntityEditModal = ({
    isOpen,
    entity,
    toggleModal,
    onSave,
    fieldsConfig,
    url,
    method,
}) => {
    if (!isOpen || !entity) return null;

    const { errors, handleSubmit, handleFieldChange, newEntity } =
        useEditEntity(entity, url, method, onSave, toggleModal);

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
                    <h2 className="text-2xl mb-2">
                        Edit {entity?.name || entity?.title || "Entity"}
                    </h2>
                </div>

                {fieldsConfig.map((field) => {
                    return (
                        <div className="mt-2" key={field.key}>
                            <label>{field.label}</label>
                            {field.type === "text" && (
                                <input
                                    type="text"
                                    value={
                                        newEntity[field.key] ||
                                        entity[field.key] ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        handleFieldChange(
                                            field.key,
                                            e.target.value
                                        )
                                    }
                                    className="border p-1 w-full bg-stone-700"
                                />
                            )}
                            {field.type === "select" && (
                                <select
                                    value={
                                        newEntity[field.key] ||
                                        entity[field.key] ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        handleFieldChange(
                                            field.key,
                                            e.target.value
                                        )
                                    }
                                    className="border p-1 w-full bg-stone-700 hover:cursor-pointer cursor-pointer"
                                >
                                    {field.options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    );
                })}

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

export default EntityEditModal;
