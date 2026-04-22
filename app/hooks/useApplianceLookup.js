"use client";
import { useState } from "react";

export default function useApplianceLookup() {
    const [result, setResult] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function lookup(serialNumber) {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/appliances/${encodeURIComponent(serialNumber)}`);
            const json = await res.json();

            if (json.success) {
                setResult(json.data);
                setNotFound(false);
            } else {
                setResult(null);
                setNotFound(true);
            }

            return json;
        } catch (err) {
            setError("Network error. Please try again.");
            setResult(null);
            setNotFound(false);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }

    function reset() {
        setResult(null);
        setNotFound(false);
        setLoading(false);
        setError(null);
    }

    return { result, notFound, loading, error, lookup, reset };
}
