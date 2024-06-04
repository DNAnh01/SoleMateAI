import { useState, useEffect, useCallback } from 'react';

const useFetchData = (callback) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshCount, setRefreshCount] = useState(0);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await callback();
            setData(result.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [callback]);

    useEffect(() => {
        fetchData();
    }, [fetchData, refreshCount]);

    const refresh = () => setRefreshCount((prev) => prev + 1);

    return { data, loading, error, refresh };
};

export default useFetchData;
