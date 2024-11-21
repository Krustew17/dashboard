import { useState } from "react";
import requester from "../../common/requester";

export default function useDeleteEntity(
    entityId,
    url,
    method,
    onDelete,
    toggleDeleteModal
) {
    const [errors, setErrors] = useState();

    const handleDelete = async () => {
        try {
            const { responseJson, response } = await requester(
                `${url}/${entityId}`,
                {
                    method,
                },
                true
            );
            if (response.ok) {
                onDelete(document.id);
                toggleDeleteModal();
            }
        } catch (error) {
            setErrors({ message: "An error occurred. Please try again." });
        }
    };
    return { errors, handleDelete };
}
