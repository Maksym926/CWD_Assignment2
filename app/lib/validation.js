const EIRCODE_REGEX = /^D\d{2} \d{4}$/;
const MODEL_REGEX = /^\d{3}-\d{3}-\d{4}$/;
const SERIAL_REGEX = /^\d{4}-\d{4}-\d{4}$/;
const NAME_REGEX = /^[A-Za-z][A-Za-z' -]{1,49}$/;
const ADDRESS_REGEX = /^[A-Za-z0-9][A-Za-z0-9 ,.\-#']{4,199}$/;
const MOBILE_REGEX = /^\+[1-9]\d{1,14}$/;
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const BRAND_REGEX = /^[A-Za-z0-9][A-Za-z0-9 &\-]{1,49}$/;
const COST_REGEX = /^\d{1,8}(\.\d{1,2})?$/;
const DATE_REGEX = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

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

export function validateSerial(value) {
  if (!value) return "Serial number is required";
  if (!SERIAL_REGEX.test(value)) return "Invalid serial number. Expected format: 0000-0000-0000";
  return null;
}

export function validateFullRecord(data) {
  const errors = {};

  if (!data.firstName || !NAME_REGEX.test(data.firstName)) {
    errors.firstName = "Invalid first name. Must be 2-50 characters, letters only";
  }

  if (!data.lastName || !NAME_REGEX.test(data.lastName)) {
    errors.lastName = "Invalid last name. Must be 2-50 characters, letters only";
  }

  if (!data.address || !ADDRESS_REGEX.test(data.address)) {
    errors.address = "Invalid address. Must be 5-200 characters";
  }

  if (!data.mobile || !MOBILE_REGEX.test(data.mobile)) {
    errors.mobile = "Invalid mobile number. Expected format: +639505169923";
  }

  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    errors.email = "Invalid email address";
  }

  if (!data.eircode || !EIRCODE_REGEX.test(data.eircode)) {
    errors.eircode = "Invalid Eircode. Expected format: D00 0000";
  }

  if (!data.applianceType || !ALLOWED_TYPES.includes(data.applianceType)) {
    errors.applianceType = "Please select a valid appliance type";
  }

  if (!data.brand || !BRAND_REGEX.test(data.brand)) {
    errors.brand = "Invalid brand. Must be 2-50 characters";
  }

  if (!data.modelNumber || !MODEL_REGEX.test(data.modelNumber)) {
    errors.modelNumber = "Invalid model number. Expected format: 000-000-0000";
  }

  if (!data.serialNumber || !SERIAL_REGEX.test(data.serialNumber)) {
    errors.serialNumber = "Invalid serial number. Expected format: 0000-0000-0000";
  }

  if (!data.purchaseDate || !DATE_REGEX.test(data.purchaseDate)) {
    errors.purchaseDate = "Purchase date is required";
  }

  if (!data.warrantyExpDate || !DATE_REGEX.test(data.warrantyExpDate)) {
    errors.warrantyExpDate = "Warranty expiration date is required";
  }

  if (
    data.purchaseDate &&
    data.warrantyExpDate &&
    data.warrantyExpDate <= data.purchaseDate
  ) {
    errors.warrantyExpDate = "Warranty expiration date must be after the purchase date";
  }

  if (!data.cost || !COST_REGEX.test(data.cost)) {
    errors.cost = "Invalid cost. Must be a positive number (e.g. 899.99)";
  }

  return errors;
}
