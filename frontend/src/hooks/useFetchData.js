import { useState, useEffect } from 'react';

const useFetchData = (callback) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await callback();
                setData(result.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (!data) {
            fetchData();
        }
    }, [callback, data]);

    return { data, loading, error };
};

export default useFetchData;
