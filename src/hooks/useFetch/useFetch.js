import { useEffect, useState } from "react";

const baseHandlerError = (e) => console.error(e)

export const useFetch = (urlToCall, defaultValue, mapper, options, handlers = { handleError: baseHandlerError }) => {

    const { handleError } = handlers

    const [data, setData] = useState(defaultValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!urlToCall) return

        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(urlToCall, options)
                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }
                const json = await response.json()
                if (json.results) {
                    if (mapper) {
                        setData(mapper(json.results))
                    } else {
                        setData(json.results)
                    }
                } else {
                    if (mapper) {
                        setData(mapper(json))
                    } else {
                        setData(json)
                    }
                }
                setLoading(false)
                setError(null)

            } catch (error) {
                //This catches the error if either of the promises fails or the manual error is thrown
                setLoading(false)
                handleError(error)
            }
        }

        fetchData()
    }, [urlToCall, options]);

    return [{ data, loading, error }];
}