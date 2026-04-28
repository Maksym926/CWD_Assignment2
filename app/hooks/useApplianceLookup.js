"use client";
import { useState } from "react";

// Custom hook shared by Search, Update and Delete forms to look up an appliance by serial number
export default function useApplianceLookup() {
    const [result, setResult] = useState(null);    // appliance data returned from the API
    const [notFound, setNotFound] = useState(false); // true when the API returns 404
    const [loading, setLoading] = useState(false);   // true while the fetch is in flight
    const [error, setError] = useState(null);        // network/server error message

    async function lookup(serialNumber) {
        setLoading(true);
        setError(null);

        try {
            // encodeURIComponent protects against special characters in the serial number
            const res = await fetch(`/api/appliances/${encodeURIComponent(serialNumber)}`);
            const json = await res.json();

            if (json.success) {
                setResult(json.data);
                setNotFound(false);
            } else {
                // API returned 404 - serial number does not exist
                setResult(null);
                setNotFound(true);
            }

            // Return the JSON so callers can react to it directly without waiting for state updates
            return json;
        } catch (err) {
            // Network failure (server unreachable, CORS, etc.)
            setError("Network error. Please try again.");
            setResult(null);
            setNotFound(false);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }

    // Clears all state so the form can return to its initial lookup stage
    function reset() {
        setResult(null);
        setNotFound(false);
        setLoading(false);
        setError(null);
    }

    return { result, notFound, loading, error, lookup, reset };
}
