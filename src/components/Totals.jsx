import { subtotal, grandTotal, formatNaira } from "../utils/calculateTotal";

export default function Totals({ invoice }) {
  const sub = subtotal(invoice.items);
  const previousBalance = Number(invoice.previousBalance) || 0;
  const total = grandTotal(invoice);
  const isPaid = invoice.paid === true;

  return (
    <div>
      <p className="total-row">
        <span>Subtotal:</span>
        <span>{formatNaira(sub)}</span>
      </p>

      {previousBalance > 0 && (
        <p className="total-row">
          <span>Previous Balance:</span>
          <span>{formatNaira(previousBalance)}</span>
        </p>
      )}

      <h3 className="total-grand">
        <span>Total:</span>
        <span>{formatNaira(total)}</span>
      </h3>

      <p className={isPaid ? "status-paid" : "status-unpaid"}>
        Status: {isPaid ? "PAID ✓" : "UNPAID"}
      </p>
    </div>
  );
}
