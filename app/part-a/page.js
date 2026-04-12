"use client";
import { useState } from "react";
import BookingForm from "@/app/components/booking/BookingForm";
import BookingConfirmation from "@/app/components/booking/BookingConfirmation";

// Part A — Movie ticket booking page
// Manages state to switch between the booking form and confirmation screen
export default function BookingPage() {
  // Stores the submitted booking details (movie, showtime, mobile)
  const [formData, setFormData] = useState({
    movie: "",
    showtime: "",
    mobile: "",
  });
  // Tracks whether the booking has been confirmed
  const [confirmed, setConfirmed] = useState(false);

  // If confirmed — show the confirmation screen
  if (confirmed) {
    return (
      <BookingConfirmation
        data={formData}
        onReset={() => {
          // Reset both states to go back to the empty form
          setConfirmed(false);
          setFormData({ movie: "", showtime: "", mobile: "" });
        }}
      />
    );
  }

  // Otherwise show the booking form
  return (
    <BookingForm
      onSubmit={(data) => {
        setFormData(data);    // Save submitted data
        setConfirmed(true);   // Switch to confirmation screen
      }}
    />
  );
}
