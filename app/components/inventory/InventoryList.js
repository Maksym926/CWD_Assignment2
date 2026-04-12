import styles from "@/app/styles/inventory.module.css";

// Helper function to convert date from YYYY-MM-DD to DD/MM/YYYY format
function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

// Displays confirmation after appliance was successfully added to inventory
// Shows all the submitted data in a table and button to add another one
export default function InventoryList({ data, onReset }) {
  return (
    <div className={styles.confirmation}>
      <h2>Appliance Added to Inventory!</h2>
      <p className={styles.confirmMsg}>
        Your appliance has been saved to the inventory (Entry #{data.id}).
      </p>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>Eircode</th>
            <td>{data.eircode}</td>
          </tr>
          <tr>
            <th>Appliance Type</th>
            <td>{data.applianceType}</td>
          </tr>
          <tr>
            <th>Brand</th>
            <td>{data.brand}</td>
          </tr>
          <tr>
            <th>Model Number</th>
            <td>{data.modelNumber}</td>
          </tr>
          <tr>
            <th>Serial Number</th>
            <td>{data.serialNumber}</td>
          </tr>
          <tr>
            <th>Purchase Date</th>
            <td>{formatDate(data.purchaseDate)}</td>
          </tr>
          <tr>
            <th>Warranty Expiration</th>
            <td>{formatDate(data.warrantyExpDate)}</td>
          </tr>
        </tbody>
      </table>
      <button className={styles.resetBtn} onClick={onReset}>
        Add Another Appliance
      </button>
    </div>
  );
}
