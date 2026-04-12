"use client";
import { useState } from "react";
import styles from "@/app/styles/inventory.module.css";

// Main form component for adding a new appliance to the inventory
export default function InventoryForm({ applianceTypes, onSuccess }) {
  // Store all form field values in one state object
  const [formData, setFormData] = useState({
    eircode: "",
    applianceType: "",
    brand: "",
    modelNumber: "",
    serialNumber: "",
    purchaseDate: "",
    warrantyExpDate: "",
  });
  // Store validation errors returned from the server
  const [errors, setErrors] = useState({});
  // Prevent double submit while request is in progress
  const [submitting, setSubmitting] = useState(false);

  // Generic change handler — uses input name attribute to update correct field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field as user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Send form data to the API route and handle the response
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      // Post form data as JSON to the register endpoint
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (result.success) {
        // Pass confirmed data up to parent so it can show the confirmation screen
        onSuccess(result.data);
      } else {
        // Sticky behaviour — server returns all submitted values
        // so valid fields stay filled, only invalid ones show errors
        if (result.formData) setFormData(result.formData);
        setErrors(result.errors || { general: "Submission failed. Please try again." });
      }
    } catch {
      setErrors({ general: "An unexpected error occurred." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles["inventory-form"]} onSubmit={handleSubmit} noValidate>
      <h2>House Appliance Inventory</h2>

      {errors.general && <div className={styles.errorBanner}>{errors.general}</div>}

      <div className={styles.field}>
        <label htmlFor="eircode">Eircode</label>
        <input
          id="eircode"
          name="eircode"
          type="text"
          value={formData.eircode}
          onChange={handleChange}
          placeholder="D01 1234"
          required
          maxLength={8}
          pattern="^D\d{2} \d{4}$"
          className={errors.eircode ? styles.inputError : ""}
        />
        {errors.eircode && <span className={styles.error}>{errors.eircode}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="applianceType">Appliance Type</label>
        <select
          id="applianceType"
          name="applianceType"
          value={formData.applianceType}
          onChange={handleChange}
          required
          className={errors.applianceType ? styles.inputError : ""}
        >
          <option value="">Select an appliance type</option>
          {applianceTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.applianceType && <span className={styles.error}>{errors.applianceType}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="brand">Brand</label>
        <input
          id="brand"
          name="brand"
          type="text"
          value={formData.brand}
          onChange={handleChange}
          placeholder="e.g. Samsung"
          required
          maxLength={50}
          className={errors.brand ? styles.inputError : ""}
        />
        {errors.brand && <span className={styles.error}>{errors.brand}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="modelNumber">Model Number</label>
        <input
          id="modelNumber"
          name="modelNumber"
          type="text"
          value={formData.modelNumber}
          onChange={handleChange}
          placeholder="000-000-0000"
          required
          maxLength={12}
          pattern="^\d{3}-\d{3}-\d{4}$"
          className={errors.modelNumber ? styles.inputError : ""}
        />
        {errors.modelNumber && <span className={styles.error}>{errors.modelNumber}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="serialNumber">Serial Number</label>
        <input
          id="serialNumber"
          name="serialNumber"
          type="text"
          value={formData.serialNumber}
          onChange={handleChange}
          placeholder="0000-0000-0000"
          required
          maxLength={14}
          pattern="^\d{4}-\d{4}-\d{4}$"
          className={errors.serialNumber ? styles.inputError : ""}
        />
        {errors.serialNumber && <span className={styles.error}>{errors.serialNumber}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="purchaseDate">Purchase Date</label>
        <input
          id="purchaseDate"
          name="purchaseDate"
          type="date"
          value={formData.purchaseDate}
          onChange={handleChange}
          required
          className={errors.purchaseDate ? styles.inputError : ""}
        />
        {errors.purchaseDate && <span className={styles.error}>{errors.purchaseDate}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="warrantyExpDate">Warranty Expiration Date</label>
        <input
          id="warrantyExpDate"
          name="warrantyExpDate"
          type="date"
          value={formData.warrantyExpDate}
          onChange={handleChange}
          required
          className={errors.warrantyExpDate ? styles.inputError : ""}
        />
        {errors.warrantyExpDate && <span className={styles.error}>{errors.warrantyExpDate}</span>}
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? "Registering..." : "Add to Inventory"}
      </button>
    </form>
  );
}
