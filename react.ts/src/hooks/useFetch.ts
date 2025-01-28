import { useEffect, useState } from "react";


function useFetch<T>(url: string): [T | null, boolean, string | null] {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error while fetching data. Status: " + response.);
                }
                const result = await response.json() as T;
                setData(result);
                console.log('Fetched data')
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    },[url]);

    return [data, loading, error];
}

export default useFetch;