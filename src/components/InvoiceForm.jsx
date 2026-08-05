import ItemRow from "./ItemRow";
import { defaultInvoice } from "../pages/Home";

export default function InvoiceForm({ invoice, setInvoice }) {
  const updateField = (field, value) => {
    setInvoice({
      ...invoice,
      [field]: value,
    });
  };

  const updateItem = (id, field, value) => {
    setInvoice({
      ...invoice,
      items: invoice.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        {
          id: Date.now(),
          description: "",
          quantity: 1,
          price: 0,
        },
      ],
    });
  };

  const removeItem = (id) => {
    if (invoice.items.length === 1) return; // always keep one row to type into

    setInvoice({
      ...invoice,
      items: invoice.items.filter((item) => item.id !== id),
    });
  };

  // flips invoice → receipt (and back, in case of a mistake)
  const togglePaid = () => {
    updateField("paid", !invoice.paid);
  };

  // fresh invoice for the next customer — keeps the company name
  const newInvoice = () => {
    const ok = window.confirm(
      "Start a new invoice? The current one will be cleared."
    );
    if (!ok) return;

    setInvoice({
      ...defaultInvoice,
      company: invoice.company, // the shop doesn't change between sales
      items: [
        { id: Date.now(), description: "", quantity: 1, price: 0 },
      ],
    });
  };

  return (
    <div className="card">
      <h2>Invoice Details</h2>

      <div className="form-group">
        <label className="form-label">Company Name</label>

        <input
          className="form-input"
          value={invoice.company}
          onChange={(e) => updateField("company", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Customer Name</label>

        <input
          className="form-input"
          value={invoice.customer}
          onChange={(e) => updateField("customer", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Date</label>

        <input
          className="form-input"
          type="date"
          value={invoice.date}
          onChange={(e) => updateField("date", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Previous Balance (₦)</label>

        <input
          className="form-input"
          type="number"
          inputMode="numeric"
          min="0"
          value={invoice.previousBalance}
          onChange={(e) =>
            updateField("previousBalance", Number(e.target.value))
          }
        />
      </div>

      <hr />

      <h3>Invoice Items</h3>

      {invoice.items.map((item) => (
        <ItemRow
          key={item.id}
          item={item}
          updateItem={updateItem}
          removeItem={removeItem}
        />
      ))}

      <button className="btn btn-ghost" onClick={addItem}>
        + Add Item
      </button>

      <hr />

      {/* the button that turns an invoice into a receipt */}
      <div className="action-row">
        <button
          className={invoice.paid ? "btn btn-warn" : "btn btn-primary"}
          onClick={togglePaid}
        >
          {invoice.paid ? "Mark as Unpaid" : "Mark as Paid ✓"}
        </button>

        <button className="btn btn-ghost" onClick={newInvoice}>
          New Invoice
        </button>
      </div>
    </div>
  );
}