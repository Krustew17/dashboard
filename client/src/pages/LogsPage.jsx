import React, { useState } from "react";
import Nav from "../components/Navbar";
import Logs from "../components/Logs";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import apiEndPoints from "../config/apiEndpoints";
import useFetchEntity from "../components/hooks/useFetchEntity";
import validEntityTypes from "../constants/validEntityTypes";

const LogsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(
        parseInt(searchParams.get("page")) || 1
    );
    const [totalPages, setTotalPages] = useState(0);

    const fetchUrl = `${apiEndPoints.logs.all.url}?${searchParams.toString()}`;

    const {
        entities: logs,
        loading,
        error,
        refetch,
    } = useFetchEntity(
        validEntityTypes.logs,
        fetchUrl,
        apiEndPoints.logs.all.method,
        setTotalPages
    );

    const onPageChange = (page) => {
        if (page > totalPages) return;
        setSearchParams({ page });
        setCurrentPage(page);
        refetch();
    };

    return (
        <div>
            <Nav />
            <ol className="relative m-2">
                <Logs logs={logs} loading={loading} error={error} />
            </ol>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default LogsPage;
