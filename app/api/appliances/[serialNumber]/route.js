import pool from '../../../lib/db.js';
import { validateFullRecord } from '../../../lib/validation.js';
import { sanitize } from '../../../lib/sanitize.js';

export async function GET(request, { params }) {

    try {
        const { serialNumber } = await params;


        const [rows] = await pool.query(
            'SELECT a.*, u.* FROM Appliance a JOIN User u ON a.UserID = u.UserID WHERE a.SerialNumber = ?',
            [serialNumber]
        );

        if (rows.length === 0) {
            return Response.json(
                { success: false, message: "No matching appliance found" },
                { status: 404 }
            );
        }

        return Response.json(
            { success: true, data: rows[0] },
            { status: 200 }
        );


    } catch {
        return Response.json(
            { success: false, errors: { general: "An error occurred. Please try again" } },
            { status: 500 }
        );
    }
}
export async function DELETE(request, { params }) {
    try {
        const { serialNumber } = await params;

        const [result] = await pool.query(
            'DELETE FROM Appliance WHERE SerialNumber = ?',
            [serialNumber]
        );
        if (result.affectedRows === 0) {
            return Response.json(
                { success: false, message: "No matching appliance found" },
                { status: 404 }
            );
        }

        return Response.json(
            { success: true, message: "Appliance Deleted" },
            { status: 200 }
        );



    } catch {
        return Response.json(
            { success: false, errors: { general: "An error occurred. Please try again" } },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const { serialNumber } = await params;

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
            'SELECT ApplianceID, UserID FROM Appliance WHERE SerialNumber = ?',
            [serialNumber]
        );

        if (existing.length === 0) {
            return Response.json(
                { success: false, message: "No matching appliance found" },
                { status: 404 }
            );
        }

        const userId = existing[0].UserID;

        await pool.query(
            'UPDATE User SET FirstName = ?, LastName = ?, Address = ?, Mobile = ?, Email = ?, Eircode = ? WHERE UserID = ?',
            [stickData.firstName, stickData.lastName, stickData.address, stickData.mobile, stickData.email, stickData.eircode, userId]
        );

        await pool.query(
            'UPDATE Appliance SET ApplianceType = ?, Brand = ?, ModelNumber = ?, PurchaseDate = ?, WarrantyExpirationDate = ?, CostOfAppliance = ? WHERE SerialNumber = ?',
            [stickData.applianceType, stickData.brand, stickData.modelNumber, stickData.purchaseDate, stickData.warrantyExpDate, stickData.cost, serialNumber]
        );

        return Response.json(
            { success: true, message: "Appliance has been updated" },
            { status: 200 }
        );

    }
    catch {
        return Response.json(
            { success: false, errors: { general: "An error occurred. Please try again" } },
            { status: 500 }
        );
    }
}
