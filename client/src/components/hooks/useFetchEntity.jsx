import React, { useState, useEffect, useCallback } from "react";
import requester from "../../common/requester";

export default function useFetchEntity(
    type = "",
    url,
    method,
    setTotalPages = null
) {
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEntities = useCallback(async () => {
        try {
            const { responseJson, response } = await requester(
                url,
                {
                    method: method,
                },
                true
            );
            setEntities(responseJson[type] || []);
            console.log(responseJson);
            setLoading(false);
            if (setTotalPages) {
                setTotalPages(responseJson.totalPages);
            }
        } catch (err) {
            console.log(err);
            setError(`Failed to fetch ${type}`);
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchEntities();
    }, [fetchEntities]);

    return {
        entities,
        loading,
        error,
        refetch: fetchEntities,
    };
}
