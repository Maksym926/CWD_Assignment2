"use client";
import styles from '../../styles/booking.module.css'
import { movies } from '@/app/lib/movies.js'
import { useState } from 'react';

// Booking form component — allows user to select a movie, showtime, and enter mobile number
// Receives onSubmit prop from parent to pass form data up when validation passes
export default function TicketForm({ onSubmit }) {
    // Store all form field values in one state object
    const [formData, setFormData] = useState({
        movie: "",
        showtime: "",
        mobile: ""
    })
    // Store validation error messages for each field
    const [errors, setErrors] = useState({});

    // Client-side validation — checks all fields before submitting
    const validate = () => {
        const newErrors = {};
        if (!formData.movie) newErrors.movie = "Please select a movie";
        if (!formData.showtime) newErrors.showtime = "Please select a showtime";
        // Mobile number must be 10 or 11 digits only
        if (!/^[0-9]{10,11}$/.test(formData.mobile))
            newErrors.mobile = "Enter a valid mobile number (10-11 digits)";
        return newErrors;
    };

    // Generic change handler — updates the correct field using input name attribute
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for this field when user starts typing
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // Handle form submission — validate first, then pass data to parent
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const foundErrors = validate();
        // If there are errors, show them and stop submission
        if (Object.keys(foundErrors).length > 0) { setErrors(foundErrors); return }
        // No errors — send data to parent component
        onSubmit(formData);
    }
    return (

        <form className={styles['booking-form']} onSubmit={handleFormSubmit}>
            {/* Movie dropdown — populated from the movies data file */}
            <select name="movie" value={formData.movie} onChange={handleChange}>
                <option value="">Select a movie</option>
                {Object.keys(movies).map((movie) => (
                    <option key={movie} value={movie}>{movie}</option>
                ))}


            </select>
            {errors.movie && <span>{errors.movie}</span>}

            {/* Showtime dropdown — only enabled after a movie is selected */}
            {/* Shows showtimes specific to the selected movie */}
            <select name="showtime" value={formData.showtime} onChange={handleChange} disabled={!formData.movie}>
                <option value="">Select a showtime</option>
                {formData.movie && movies[formData.movie].map((time) => (
                    <option key={time} value={time}>{time}</option>
                ))}

            </select>
            {errors.showtime && <span>{errors.showtime}</span>}

            {/* Mobile number input — limited to 11 characters */}
            <input
                type="tel"
                name="mobile"
                placeholder="Enter mobile number "
                value={formData.mobile}
                onChange={handleChange}
                maxLength={11}
            />
            {errors.mobile && <span>{errors.mobile}</span>}
            <button type='submit'>Book Tickets</button>
        </form>
    );
}
