import { useEffect, useState } from "react";


function useFetch<T>(url: string): [T | null, boolean, string | null] {
    const [data, setData] = useState<T | null>(null);
    const [errorFetch, setErrorFetch] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error while fetching data. Status: ${response.status}${response.statusText ? " Status-Text: " + response.statusText : ""}`);
                }
                const result = await response.json() as T;
                setData(result);
                console.log('Fetched data')
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setErrorFetch(error.message);
                } else {
                    setErrorFetch(String(error));
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return [data, loading, errorFetch];
}

export default useFetch;