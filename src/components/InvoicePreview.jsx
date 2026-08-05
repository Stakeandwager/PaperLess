import { useState } from "react";
import Totals from "./Totals";
import {
  lineTotal,
  subtotal,
  grandTotal,
  formatNaira,
} from "../utils/calculateTotal";

export default function InvoicePreview({ invoice }) {
  const [copied, setCopied] = useState(false);
  const isPaid = invoice.paid === true;

  // only show rows the customer actually bought —
  // empty typing rows stay in the form, not on the invoice
  const realItems = invoice.items.filter(
    (item) => item.description.trim() !== "" || Number(item.price) > 0
  );

  // the invoice as a WhatsApp message (* makes text bold in WhatsApp)
  const buildWhatsAppText = () => {
    const lines = [
      `*${invoice.company}*`,
      `${isPaid ? "RECEIPT" : "INVOICE"}${
        invoice.date ? " — " + invoice.date : ""
      }`,
      `Customer: ${invoice.customer || "-"}`,
      "",
      ...realItems.map(
        (item) =>
          `${item.description} — ${item.quantity} x ${formatNaira(
            item.price
          )} = ${formatNaira(lineTotal(item))}`
      ),
      "",
      `Subtotal: ${formatNaira(subtotal(invoice.items))}`,
    ];

    if (Number(invoice.previousBalance) > 0) {
      lines.push(`Previous Balance: ${formatNaira(invoice.previousBalance)}`);
    }

    lines.push(`*Total: ${formatNaira(grandTotal(invoice))}*`);
    lines.push(isPaid ? "Status: PAID ✓" : "Status: UNPAID");
    lines.push("", "Thank you for your patronage.");

    return lines.join("\n");
  };

  const copyForWhatsApp = () => {
    navigator.clipboard.writeText(buildWhatsAppText()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="card">
      <h2>{isPaid ? "Receipt" : "Invoice Preview"}</h2>

      <hr />

      <h3>{invoice.company}</h3>

      <p>
        <strong>Customer:</strong> {invoice.customer || "-"}
      </p>

      <p>
        <strong>Date:</strong> {invoice.date || "Select a date"}
      </p>

      <hr />

      {realItems.length === 0 ? (
        <p className="empty-note">No items yet — add one on the form.</p>
      ) : (
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Description</th>
              <th className="center">Qty</th>
              <th className="num">Price</th>
              <th className="num">Amount</th>
            </tr>
          </thead>

          <tbody>
            {realItems.map((item) => (
              <tr key={item.id}>
                <td>{item.description || "-"}</td>
                <td className="center">{item.quantity}</td>
                <td className="num">{formatNaira(item.price)}</td>
                <td className="num">{formatNaira(lineTotal(item))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr />

      <Totals invoice={invoice} />

      <div className="action-row">
        <button className="btn btn-primary" onClick={copyForWhatsApp}>
          {copied ? "Copied ✓" : "Copy for WhatsApp"}
        </button>

        <button className="btn btn-ghost" onClick={() => window.print()}>
          Print / PDF
        </button>
      </div>
    </div>
  );
}