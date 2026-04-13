import pool from '../../lib/db.js';
import { validateFullRecord } from '../../lib/validation.js';
import { sanitize } from '../../lib/sanitize.js';

export async function POST(request) {
  try {
    const body = await request.json();

    const errors = validateFullRecord(body);

    const stickData = {

        applianceType: sanitize(body.applianceType),
        brand: sanitize(body.brand),
        modelNumber: sanitize(body.modelNumber),
        serialNumber: sanitize(body.serialNumber),
        purchaseDate: sanitize(body.purchaseDate),
        warrantyExpDate: sanitize(body.warrantyExpDate),
        cost: sanitize(body.cost),


        firstName: sanitize(body.firstName),
        lastName: sanitize(body.lastName),
        address: sanitize(body.address),
        mobile: sanitize(body.mobile),
        email: sanitize(body.email),
        eircode: sanitize(body.eircode)

    }
    if (Object.keys(errors).length > 0) {
        return Response.json(
            { success: false, errors, formData: stickData },
            { status: 400 }
        );
    }

    const [existing] = await pool.query(
        'SELECT ApplianceID FROM appliances WHERE SerialNumber = ?',
        [stickData.serialNumber]
    );

    if (existing.length > 0) {
        return Response.json(
            { success: false, errors: { serialNumber: "Appliance already exists" } },
            { status: 409 }
        );
    }

    const [users] = await pool.query(
        'SELECT UserID FROM users WHERE Email = ?',
        [stickData.email]
    );

    let userId;

    if (users.length > 0) {
        // Reuse existing user
        userId = users[0].UserID;
    } else {
        // Insert new user
        const [userResult] = await pool.query(
            'INSERT INTO User (FirstName, LastName, Address, Mobile, Email, Eircode) VALUES (?, ?, ?, ?, ?, ?)',
            [stickData.firstName, stickData.lastName, stickData.address, stickData.mobile, stickData.email, stickData.eircode]
        );
        userId = userResult.insertId;
    }

    // Insert the appliance linked to the user
    const [appResult] = await pool.query(
        'INSERT INTO Appliance (UserID, ApplianceType, Brand, ModelNumber, SerialNumber, PurchaseDate, WarrantyExpirationDate, CostOfAppliance) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, stickData.applianceType, stickData.brand, stickData.modelNumber, stickData.serialNumber, stickData.purchaseDate, stickData.warrantyExpDate, stickData.cost]
    );

    return Response.json(
        { success: true, data: { applianceId: appResult.insertId, userId } },
        { status: 201 }
    );
  } catch {
    return Response.json(
        { success: false, errors: { general: "An error occurred. Please try again." } },
        { status: 500 }
    );
  }
}