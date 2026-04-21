"use client";
import { useState } from "react";
import { ALLOWED_TYPES } from "../../lib/validation";

export default function AddForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        mobile: "",
        email: "",
        eircode: "",
        applianceType: "",
        brand: "",
        modelNumber: "",
        serialNumber: "",
        purchaseDate: "",
        warrantyExpDate: "",
        cost: "",
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch("/api/appliances", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const json = await res.json();

        if (json.success) {
            setSuccess(true);
            setErrors({});
        } else {
            setErrors(json.errors || {});
            if (json.formData) setFormData(json.formData);
        }
    }

    if (success) {
        return (
            <div className="alert alert-success text-center">
                <h4>New appliance added successfully!</h4>
                <a href="/" className="btn btn-primary mt-3">Return to Home</a>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
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
                    <input
                        type="text"
                        name="serialNumber"
                        className={`form-control ${errors.serialNumber ? "is-invalid" : ""}`}
                        value={formData.serialNumber}
                        onChange={handleChange}
                        maxLength={14}
                        required
                    />
                    {errors.serialNumber && <div className="invalid-feedback">{errors.serialNumber}</div>}
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

            <button type="submit" className="btn btn-primary w-100">Add Appliance</button>
        </form>
    );
}
