import { useState } from "react";

export default function useToggleModal() {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState(null);

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    };

    const handleEditClick = (entity) => {
        setSelectedEntity(entity);
        toggleEditModal();
    };

    const toggleDeleteModal = (entity) => {
        setSelectedEntity(entity);
        setDeleteModalOpen(!deleteModalOpen);
    };
    const toggleCreateModal = () => {
        setCreateModalOpen(!createModalOpen);
    };

    return {
        selectedEntity,
        toggleCreateModal,
        toggleDeleteModal,
        toggleEditModal,
        handleEditClick,
        editModalOpen,
        createModalOpen,
        deleteModalOpen,
    };
}
