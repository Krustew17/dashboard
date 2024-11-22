import { useState } from "react";

export default function useCustomPagination(
    refetch,
    searchParams,
    setSearchParams
) {
    const [currentPage, setCurrentPage] = useState(
        parseInt(searchParams.get("page")) || 1
    );
    const [totalPages, setTotalPages] = useState(0);
    const onPageChange = (page) => {
        if (page > totalPages) return;
        setSearchParams({ page });
        setCurrentPage(page);
        refetch();
    };

    return {
        currentPage,
        setCurrentPage,
        totalPages,
        onPageChange,
        setTotalPages,
    };
}
