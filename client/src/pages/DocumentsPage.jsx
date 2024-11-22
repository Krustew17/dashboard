import React, { useState } from "react";
import Nav from "../components/Navbar";
import DocumentsTable from "../components/DocumentsTable";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import apiEndPoints from "../config/apiEndpoints";
import useFetchEntity from "../components/hooks/useFetchEntity";
import validEntityTypes from "../constants/validEntityTypes";

const DocumentsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(
        parseInt(searchParams.get("page")) || 1
    );
    const [totalPages, setTotalPages] = useState(0);

    const fetchUrl = `${
        apiEndPoints.documents.all.url
    }?${searchParams.toString()}`;

    const {
        entities: documents,
        loading,
        error,
        refetch,
    } = useFetchEntity(
        validEntityTypes.documents,
        fetchUrl,
        apiEndPoints.documents.all.method,
        setTotalPages
    );

    const onPageChange = (page) => {
        if (page > totalPages) return;
        setSearchParams({ page });
        setCurrentPage(page);
        refetch();
    };
    const handleAction = () => {
        refetch();
    };

    return (
        <div>
            <Nav />
            <DocumentsTable
                documents={documents}
                loading={loading}
                error={error}
                handleAction={handleAction}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default DocumentsPage;
