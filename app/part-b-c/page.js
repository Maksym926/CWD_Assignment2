"use client";
import { useState, useEffect } from "react";
import InventoryForm from "@/app/components/inventory/InventoryForm";
import InventoryList from "@/app/components/inventory/InventoryList";

export default function InventoryPage() {
  // Holds the confirmed appliance data after successful submission
  const [confirmedData, setConfirmedData] = useState(null);
  // Holds the appliance types fetched from the server
  const [applianceTypes, setApplianceTypes] = useState([]);

  // On page load — call GET endpoint to fetch appliance types for dropdown
  useEffect(() => {
    fetch("/api/register")
      .then((res) => res.json())
      .then((data) => {
        if (data.applianceTypes) setApplianceTypes(data.applianceTypes);
      })
      .catch(() => {});
  }, []);

  // If we have confirmed data — show confirmation screen
  if (confirmedData) {
    return (
      <InventoryList
        data={confirmedData}
        onReset={() => setConfirmedData(null)} // Reset goes back to the form
      />
    );
  }

  // Otherwise show the inventory form
  return (
    <InventoryForm
      applianceTypes={applianceTypes}
      onSuccess={(data) => setConfirmedData(data)}
    />
  );
}
