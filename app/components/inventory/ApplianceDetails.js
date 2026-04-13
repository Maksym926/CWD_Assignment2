"use client";

export default function ApplianceDetails({ data }) {
    return (
        <div className="card">
            <div className="card-header">
                <h5>Owner Details</h5>
            </div>
            <table className="table table-striped mb-0">
                <tbody>
                    <tr><td>First Name</td><td>{data.FirstName}</td></tr>
                    <tr><td>Last Name</td><td>{data.LastName}</td></tr>
                    <tr><td>Address</td><td>{data.Address}</td></tr>
                    <tr><td>Mobile</td><td>{data.Mobile}</td></tr>
                    <tr><td>Email</td><td>{data.Email}</td></tr>
                    <tr><td>Eircode</td><td>{data.Eircode}</td></tr>
                </tbody>
            </table>
            <div className="card-header">
                <h5>Appliance Details</h5>
            </div>
            <table className="table table-striped mb-0">
                <tbody>
                    <tr><td>Appliance Type</td><td>{data.ApplianceType}</td></tr>
                    <tr><td>Brand</td><td>{data.Brand}</td></tr>
                    <tr><td>Model Number</td><td>{data.ModelNumber}</td></tr>
                    <tr><td>Serial Number</td><td>{data.SerialNumber}</td></tr>
                    <tr><td>Purchase Date</td><td>{data.PurchaseDate}</td></tr>
                    <tr><td>Warranty Expiration</td><td>{data.WarrantyExpirationDate}</td></tr>
                    <tr><td>Cost</td><td>{data.CostOfAppliance}</td></tr>
                </tbody>
            </table>
        </div>
    );
}
