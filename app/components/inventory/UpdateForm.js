"use client";
import { useState, useEffect } from "react";
import useApplianceLookup from "../../hooks/useApplianceLookup";
import { ALLOWED_TYPES, validateSerial } from "../../lib/validation";

// Three-stage form: 1) lookup by serial, 2) edit pre-filled form, 3) success
export default function UpdateForm() {
    const [serial, setSerial] = useState("");        // serial typed in Stage 1, also used for the PUT URL
    const [formData, setFormData] = useState(null);  // editable copy of the appliance for Stage 2
    const [errors, setErrors] = useState({});
    const [updated, setUpdated] = useState(false);   // flips true once PUT succeeds (Stage 3)

    const { result, notFound, loading, error, lookup, reset } = useApplianceLookup();

    // After lookup() succeeds, copy DB record into editable formData
    // DB uses PascalCase column names, the form uses camelCase, so we map field by field
    useEffect(() => {
        if (result) {
            setFormData({
                firstName: result.FirstName || "",
                lastName: result.LastName || "",
                address: result.Address || "",
                mobile: result.Mobile || "",
                email: result.Email || "",
                eircode: result.Eircode || "",
                applianceType: result.ApplianceType || "",
                brand: result.Brand || "",
                modelNumber: result.ModelNumber || "",
                serialNumber: result.SerialNumber || "",
                // MySQL returns dates as ISO strings - slice to YYYY-MM-DD for <input type="date">
                purchaseDate: result.PurchaseDate ? String(result.PurchaseDate).slice(0, 10) : "",
                warrantyExpDate: result.WarrantyExpirationDate ? String(result.WarrantyExpirationDate).slice(0, 10) : "",
                cost: result.CostOfAppliance != null ? String(result.CostOfAppliance) : "",
            });
        }
    }, [result]);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Stage 1 submit: validate serial format client-side, then call the hook
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

    // Stage 2 submit: send the edited form as a PUT to the server
    async function handleUpdate(e) {
        e.preventDefault();

        const res = await fetch(`/api/appliances/${encodeURIComponent(serial)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const json = await res.json();

        if (json.success) {
            setUpdated(true);
            setErrors({});
        } else {
            // Sticky form: server returns the sanitized formData on validation failure
            setErrors(json.errors || {});
            if (json.formData) setFormData(json.formData);
        }
    }

    function handleReset() {
        setSerial("");
        setFormData(null);
        setErrors({});
        setUpdated(false);
        reset();
    }

    if (updated) {
        return (
            <div className="alert alert-success text-center">
                <h4>Appliance has been updated!</h4>
                <a href="/" className="btn btn-primary mt-3 me-2">Return to Home</a>
                <button type="button" className="btn btn-secondary mt-3" onClick={handleReset}>Update Another</button>
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

    if (result && formData) {
        return (
            <form onSubmit={handleUpdate}>
                {errors.general && <div className="alert alert-danger">{errors.general}</div>}

                <fieldset className="mb-4">
                    <legend>Owner Details</legend>

                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                            value={formData.firstName}
                            onChange={handleChange}
                            maxLength={50}
                            required
                        />
                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                            value={formData.lastName}
                            onChange={handleChange}
                            maxLength={50}
                            required
                        />
                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            name="address"
                            className={`form-control ${errors.address ? "is-invalid" : ""}`}
                            value={formData.address}
                            onChange={handleChange}
                            maxLength={200}
                            required
                        />
                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mobile</label>
                        <input
                            type="tel"
                            name="mobile"
                            className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                            value={formData.mobile}
                            onChange={handleChange}
                            maxLength={12}
                            required
                        />
                        {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            value={formData.email}
                            onChange={handleChange}
                            maxLength={100}
                            required
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Eircode</label>
                        <input
                            type="text"
                            name="eircode"
                            className={`form-control ${errors.eircode ? "is-invalid" : ""}`}
                            value={formData.eircode}
                            onChange={handleChange}
                            maxLength={8}
                            required
                        />
                        {errors.eircode && <div className="invalid-feedback">{errors.eircode}</div>}
                    </div>
                </fieldset>

                <fieldset className="mb-4">
                    <legend>Appliance Details</legend>

                    <div className="mb-3">
                        <label className="form-label">Appliance Type</label>
                        <select
                            name="applianceType"
                            className={`form-select ${errors.applianceType ? "is-invalid" : ""}`}
                            value={formData.applianceType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Type</option>
                            {ALLOWED_TYPES.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        {errors.applianceType && <div className="invalid-feedback">{errors.applianceType}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            className={`form-control ${errors.brand ? "is-invalid" : ""}`}
                            value={formData.brand}
                            onChange={handleChange}
                            required
                        />
                        {errors.brand && <div className="invalid-feedback">{errors.brand}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Model Number</label>
                        <input
                            type="text"
                            name="modelNumber"
                            className={`form-control ${errors.modelNumber ? "is-invalid" : ""}`}
                            value={formData.modelNumber}
                            onChange={handleChange}
                            maxLength={12}
                            required
                        />
                        {errors.modelNumber && <div className="invalid-feedback">{errors.modelNumber}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Serial Number</label>
                        {/* Serial number is the primary key - cannot be edited */}
                        <input
                            type="text"
                            name="serialNumber"
                            className="form-control"
                            value={formData.serialNumber}
                            readOnly
                        />
                        <small className="form-text text-muted">Serial number cannot be changed</small>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Purchase Date</label>
                        <input
                            type="date"
                            name="purchaseDate"
                            className={`form-control ${errors.purchaseDate ? "is-invalid" : ""}`}
                            value={formData.purchaseDate}
                            onChange={handleChange}
                            required
                        />
                        {errors.purchaseDate && <div className="invalid-feedback">{errors.purchaseDate}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Warranty Expiration Date</label>
                        <input
                            type="date"
                            name="warrantyExpDate"
                            className={`form-control ${errors.warrantyExpDate ? "is-invalid" : ""}`}
                            value={formData.warrantyExpDate}
                            onChange={handleChange}
                            required
                        />
                        {errors.warrantyExpDate && <div className="invalid-feedback">{errors.warrantyExpDate}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Cost of Appliance</label>
                        <input
                            type="number"
                            name="cost"
                            className={`form-control ${errors.cost ? "is-invalid" : ""}`}
                            value={formData.cost}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                        />
                        {errors.cost && <div className="invalid-feedback">{errors.cost}</div>}
                    </div>
                </fieldset>

                <button type="submit" className="btn btn-primary w-100">Update Appliance</button>
            </form>
        );
    }

    return (
        <form onSubmit={handleLookup}>
            {error && <div className="alert alert-danger">{error}</div>}

            <fieldset className="mb-4">
                <legend>Find Appliance to Update</legend>
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
