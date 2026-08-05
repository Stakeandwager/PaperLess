import {
  lineTotal,
  subtotal,
  grandTotal,
  formatNaira,
} from "../utils/calculateTotal";

export default function InvoicePreview({ invoice }) {
  // math now comes from utils — nothing calculated by hand in here
  const sub = subtotal(invoice.items);
  const previousBalance = Number(invoice.previousBalance) || 0;
  const total = grandTotal(invoice);

  // status comes from data, not hardcoded
  const isPaid = invoice.paid === true;

  return (
    <div style={styles.card}>
      <h2>{isPaid ? "Receipt" : "Invoice Preview"}</h2>

      <hr />

      <h3>{invoice.company}</h3>

      <p>
        <strong>Customer:</strong> {invoice.customer}
      </p>

      <p>
        <strong>Date:</strong> {invoice.date || "Select a date"}
      </p>

      <hr />

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.thLeft}>Description</th>
            <th>Qty</th>
            <th style={styles.thRight}>Price</th>
            <th style={styles.thRight}>Amount</th>
          </tr>
        </thead>

        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id}>
              <td>{item.description || "-"}</td>
              <td style={styles.center}>{item.quantity}</td>
              <td style={styles.right}>{formatNaira(item.price)}</td>
              <td style={styles.right}>{formatNaira(lineTotal(item))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* math reads top-down so the customer can follow it */}
      <p style={styles.totalRow}>
        <span>Subtotal:</span>
        <span>{formatNaira(sub)}</span>
      </p>

      {previousBalance > 0 && (
        <p style={styles.totalRow}>
          <span>Previous Balance:</span>
          <span>{formatNaira(previousBalance)}</span>
        </p>
      )}

      <h3 style={styles.totalRow}>
        <span>Total:</span>
        <span>{formatNaira(total)}</span>
      </h3>

      <p style={{ color: isPaid ? "green" : "red", fontWeight: "bold" }}>
        Status: {isPaid ? "PAID" : "UNPAID"}
      </p>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
    width: "500px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  thLeft: { textAlign: "left" },
  thRight: { textAlign: "right" },
  center: { textAlign: "center" },
  right: { textAlign: "right" },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "6px 0",
  },
};