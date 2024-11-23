import { useState } from "react";
import requester from "../../common/requester";

export default function useEditEntity(
    entity,
    url,
    method,
    onSave,
    toggleModal
) {
    const [errors, setErrors] = useState(null);
    const [newEntity, setNewEntity] = useState({});

    const handleSave = () => {
        onSave(entity);
        toggleModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { responseJson, response } = await requester(
                `${url}/${entity.id}`,
                {
                    method,
                    body: newEntity,
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

    const handleFieldChange = (fieldKey, value) => {
        setNewEntity({ ...newEntity, [fieldKey]: value });
    };
    return { errors, handleSave, handleSubmit, handleFieldChange, newEntity };
}