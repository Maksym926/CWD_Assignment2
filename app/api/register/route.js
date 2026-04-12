import { validateInventory, ALLOWED_TYPES } from "@/app/lib/validation";
import { sanitize } from "@/app/lib/sanitize";
import { promises as fs } from "fs";
import path from "path";

// Path to JSON file where we store all inventory entries
const INVENTORY_FILE = path.join(process.cwd(), "app", "data", "inventory.json");

// GET endpoint — returns appliance types for the form dropdown and current inventory list
export async function GET() {
  try {
    // Read existing inventory from JSON file
    const raw = await fs.readFile(INVENTORY_FILE, "utf-8");
    const inventory = JSON.parse(raw);
    return Response.json({ success: true, applianceTypes: ALLOWED_TYPES, inventory }, { status: 200 });
  } catch {
    // Return generic error message, don't expose server details
    return Response.json(
      { success: false, errors: { general: "Could not load inventory." } },
      { status: 500 }
    );
  }
}

// POST endpoint — validates form data, saves on success, returns sticky formData on error
export async function POST(request) {
  try {
    // Parse JSON body from the request
    const body = await request.json();

    // Run all validation checks on submitted data
    const errors = validateInventory(body);

    // Sanitize all submitted values to prevent XSS attacks
    // This data will be sent back to client for sticky form repopulation
    const stickyData = {
      eircode:         sanitize(body.eircode),
      applianceType:   sanitize(body.applianceType),
      brand:           sanitize(body.brand),
      modelNumber:     sanitize(body.modelNumber),
      serialNumber:    sanitize(body.serialNumber),
      purchaseDate:    sanitize(body.purchaseDate),
      warrantyExpDate: sanitize(body.warrantyExpDate),
    };

    // If there are validation errors — return them with sticky data
    // so the form can repopulate fields with previously entered values
    if (Object.keys(errors).length > 0) {
      return Response.json(
        { success: false, errors, formData: stickyData },
        { status: 400 }
      );
    }

    // All fields valid — read current inventory, add new entry, write back
    const raw = await fs.readFile(INVENTORY_FILE, "utf-8");
    const inventory = JSON.parse(raw);
    const entry = { id: Date.now(), ...stickyData };
    inventory.push(entry);
    await fs.writeFile(INVENTORY_FILE, JSON.stringify(inventory, null, 2), "utf-8");

    // Return the saved entry to display confirmation
    return Response.json({ success: true, data: entry }, { status: 201 });
  } catch {
    // Catch any unexpected errors and return generic message
    // We don't show real error details to the user for security reasons
    return Response.json(
      { success: false, errors: { general: "An error occurred. Please try again." } },
      { status: 500 }
    );
  }
}
