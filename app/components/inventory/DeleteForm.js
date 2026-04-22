"use client";
import { useState } from "react";
import useApplianceLookup from "../../hooks/useApplianceLookup";
import { validateSerial } from "../../lib/validation";
import ApplianceDetails from "./ApplianceDetails";

export default function DeleteForm() {
    const [serial, setSerial] = useState("");
    const [errors, setErrors] = useState({});
    const [deleted, setDeleted] = useState(false);

    const { result, notFound, loading, error, lookup, reset } = useApplianceLookup();

    async function handleLookup(e) {
        e.preventDefault();

        const serialError = validateSerial(serial);
        if (serialError) {
            setErrors({ serial: serialError });
            return;
        }
        setErrors({});

        await lookup(serial);
    }

    async function handleDelete() {
        const res = await fetch(`/api/appliances/${encodeURIComponent(serial)}`, {
            method: "DELETE",
        });
        const json = await res.json();

        if (json.success) {
            setDeleted(true);
            setErrors({});
        } else {
            setErrors({ general: json.message || "Failed to delete" });
        }
    }

    function handleReset() {
        setSerial("");
        setErrors({});
        setDeleted(false);
        reset();
    }

    if (deleted) {
        return (
            <div className="alert alert-success text-center">
                <h4>Appliance has been deleted!</h4>
                <a href="/" className="btn btn-primary mt-3 me-2">Return to Home</a>
                <button type="button" className="btn btn-secondary mt-3" onClick={handleReset}>Delete Another</button>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="alert alert-warning text-center">
                <h4>No matching appliance found!</h4>
                <a href="/" className="btn btn-primary mt-3 me-2">Return to Home</a>
                <button type="button" className="btn btn-secondary mt-3" onClick={handleReset}>Try Again</button>
            </div>
        );
    }

    if (result) {
        return (
            <div>
                {errors.general && <div className="alert alert-danger">{errors.general}</div>}

                <div className="alert alert-warning text-center">
                    <h4>Are you sure you want to delete this appliance?</h4>
                    <p className="mb-0">This action cannot be undone.</p>
                </div>

                <ApplianceDetails data={result} />

                <div className="d-flex gap-2 mt-3">
                    <button type="button" className="btn btn-danger flex-fill" onClick={handleDelete}>
                        Confirm Delete
                    </button>
                    <button type="button" className="btn btn-secondary flex-fill" onClick={handleReset}>
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleLookup}>
            {error && <div className="alert alert-danger">{error}</div>}

            <fieldset className="mb-4">
                <legend>Find Appliance to Delete</legend>
                <div className="mb-3">
                    <label className="form-label">Serial Number</label>
                    <input
                        type="text"
                        name="serial"
                        className={`form-control ${errors.serial ? "is-invalid" : ""}`}
                        value={serial}
                        onChange={(e) => setSerial(e.target.value)}
                        required
                    />
                    {errors.serial && <div className="invalid-feedback">{errors.serial}</div>}
                </div>
            </fieldset>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Searching..." : "Find Appliance"}
            </button>
        </form>
    );
}
