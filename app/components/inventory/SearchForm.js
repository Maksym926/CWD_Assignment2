"use client"
import { useState } from "react";
import ApplianceDetails from "./ApplianceDetails";
import useApplianceLookup from "../../hooks/useApplianceLookup";
import { validateSerial } from "../../lib/validation";

export default function SearchForm() {
    const [formData, setFormData] = useState({
        serialNumber: "",
    });
    const [errors, setErrors] = useState({});

    const { result, notFound, loading, error, lookup } = useApplianceLookup();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleReset() {
        setFormData(null);
        setErrors({});
        reset();
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const serialError = validateSerial(formData.serialNumber);
        if (serialError) {
            setErrors({ serialNumber: serialError });
            return;
        }
        setErrors({});

        await lookup(formData.serialNumber);
    }
    if (notFound) {
        return (
            <div className="alert alert-warning text-center">
                <h4>No matching appliance found!</h4>
                <a href="/" className="btn btn-primary mt-3">Return to Home</a>
                
            </div>
        );
    }

    if (result) {
        return (
            <div>
                <ApplianceDetails data={result}/>
                <a href="/" className="btn btn-primary mt-3">Return to Home</a>
                
            </div>
        );
    }

    
    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            {errors.general && <div className="alert alert-danger">{errors.general}</div>}
            <fieldset className="mb-4">
                <legend>Search</legend>
                <div className="mb-3">
                    <label>Serial Number</label>
                    <input
                        type="text"
                        name="serialNumber"
                        className={`form-control ${errors.serialNumber ? "is-invalid" : ""}`}
                        value={formData.serialNumber}
                        onChange={handleChange}
                        required
                    />
                    {errors.serialNumber && <div className="invalid-feedback">{errors.serialNumber}</div>}
                </div>
            </fieldset>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Searching..." : "Search for appliance"}
            </button>
        </form>
    );
}
