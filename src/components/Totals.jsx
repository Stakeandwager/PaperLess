import { subtotal, grandTotal, formatNaira } from "../utils/calculateTotal";

export default function Totals({ invoice }) {
  const sub = subtotal(invoice.items);
  const previousBalance = Number(invoice.previousBalance) || 0;
  const total = grandTotal(invoice);
  const isPaid = invoice.paid === true;

  return (
    <div>
      {/* math reads top-down so the customer can follow it */}
      <p style={styles.row}>
        <span>Subtotal:</span>
        <span>{formatNaira(sub)}</span>
      </p>

      {previousBalance > 0 && (
        <p style={styles.row}>
          <span>Previous Balance:</span>
          <span>{formatNaira(previousBalance)}</span>
        </p>
      )}

      <h3 style={styles.grand}>
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
  row: {
    display: "flex",
    justifyContent: "space-between",
    margin: "6px 0",
  },

  grand: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0 6px",
    borderTop: "2px solid #182420",
    paddingTop: "10px",
  },
};