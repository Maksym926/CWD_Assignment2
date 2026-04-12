// Regex patterns for validating form inputs
const EIRCODE_REGEX = /^D\d{2} \d{4}$/;       // Dublin Eircode format: D00 0000
const MODEL_REGEX = /^\d{3}-\d{3}-\d{4}$/;    // Model number format: 000-000-0000
const SERIAL_REGEX = /^\d{4}-\d{4}-\d{4}$/;   // Serial number format: 0000-0000-0000

// List of allowed appliance types for dropdown
export const ALLOWED_TYPES = [
  "Fridge",
  "Washing Machine",
  "Dishwasher",
];

// Validates all fields from the inventory form
// Returns object with error messages for each invalid field
// If object is empty — all fields are valid
export function validateInventory(data) {
  const errors = {};

  // Check eircode matches Dublin format
  if (!data.eircode || !EIRCODE_REGEX.test(data.eircode)) {
    errors.eircode = "Invalid Eircode. Expected format: D00 0000 (e.g. D01 1234)";
  }

  // Check appliance type is one of the allowed options
  if (!data.applianceType || !ALLOWED_TYPES.includes(data.applianceType)) {
    errors.applianceType = "Please select a valid appliance type";
  }

  // Brand should not be empty
  if (!data.brand || data.brand.trim().length === 0) {
    errors.brand = "Brand is required";
  }

  // Check model number matches the required format
  if (!data.modelNumber || !MODEL_REGEX.test(data.modelNumber)) {
    errors.modelNumber = "Invalid model number. Expected format: 000-000-0000";
  }

  // Check serial number matches the required format
  if (!data.serialNumber || !SERIAL_REGEX.test(data.serialNumber)) {
    errors.serialNumber = "Invalid serial number. Expected format: 0000-0000-0000";
  }

  // Purchase date is required
  if (!data.purchaseDate) {
    errors.purchaseDate = "Purchase date is required";
  }

  // Warranty date is required
  if (!data.warrantyExpDate) {
    errors.warrantyExpDate = "Warranty expiration date is required";
  }

  // Warranty date should be after purchase date
  if (
    data.purchaseDate &&
    data.warrantyExpDate &&
    data.warrantyExpDate <= data.purchaseDate
  ) {
    errors.warrantyExpDate = "Warranty expiration date must be after the purchase date";
  }

  return errors;
}
