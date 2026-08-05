import { useState } from "react";
import InvoicePreview from "./InvoicePreview";
import { grandTotal, formatNaira } from "../utils/calculateTotal";

export default function HistoryScreen({ invoices, storeName, togglePaid }) {
  const [openId, setOpenId] = useState(null);
  const open = invoices.find((inv) => inv.id === openId);

  /* ---- detail view: one saved invoice ---- */
  if (open) {
    return (
      <div className="container">
        <div className="detail-top">
          <button className="btn btn-ghost" onClick={() => setOpenId(null)}>
            ← Back to History
          </button>

          <button
            className={open.paid ? "btn btn-warn" : "btn btn-primary"}
            onClick={() => togglePaid(open.id)}
          >
            {open.paid ? "Mark as Unpaid" : "Mark as Paid ✓"}
          </button>
        </div>

        <InvoicePreview invoice={open} storeName={storeName} />
      </div>
    );
  }

  /* ---- list view: every sale ever made ---- */
  return (
    <div className="container">
      <div className="card">
        <h2>History</h2>

        {invoices.length === 0 && (
          <p className="empty-note">
            No sales yet. Every invoice you save will be listed here.
          </p>
        )}

        {invoices.map((inv) => (
          <button
            key={inv.id}
            className="history-row"
            onClick={() => setOpenId(inv.id)}
          >
            <div className="history-left">
              <span className="history-name">
                #{inv.number} · {inv.customer}
              </span>
              <span className="history-date">{inv.date}</span>
            </div>

            <div className="history-right">
              <span className="history-total">
                {formatNaira(grandTotal(inv))}
              </span>
              <span className={inv.paid ? "pill pill-paid" : "pill pill-unpaid"}>
                {inv.paid ? "PAID" : "UNPAID"}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
