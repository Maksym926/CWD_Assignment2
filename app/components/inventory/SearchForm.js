"use client"
import { useState } from "react";
import ApplianceDetails from "./ApplianceDetails";

export default function SearchForm() {
    const [formData, setFormData] = useState({
        serialNumber: "",
    });
    const [errors, setErrors] = useState({});
    
    const [result, setResult] = useState(null);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(`/api/appliances/${encodeURIComponent(formData.serialNumber)}`);
        const json = await res.json();
        if(json.success){
            setResult(json.data);
            setErrors({});
        }else{
            setErrors(json.errors || {});
            if (json.formData) setFormData(json.formData);
        }
            
        
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
            {errors.general && <div className="alert alert-danger">{errors.general}</div>}
            <fieldset className="mb-4">
                <legend>Search</legend>
                <div className="mb-3">
                    <label>Serial Number</label>
                    <input
                        type="text"
                        name="serialNumber"
                        className={`form-control ${errors.applianceType ? "is-invalid" : ""}`}
                        value={formData.serialNumber}
                        onChange={handleChange}
                        required
                    />
                    {errors.serialNumber && <div className="invalid-feedback">{errors.serialNumber}</div>}
                </div>
            </fieldset>
            <button type="submit" className="btn btn-primary w-100">Search for appliance</button>
        </form>
    );
}