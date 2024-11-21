import React, { useState, useEffect, useCallback } from "react";
import requester from "../../common/requester";

export default function useFetchEntity(type = "", url, method) {
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
            setLoading(false);
        } catch (err) {
            console.log(err);
            setError(`Failed to fetch ${type}`);
            setLoading(false);
        }
    }, []);

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
