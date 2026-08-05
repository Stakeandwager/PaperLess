import { useState } from "react";
import ItemRow from "./ItemRow";
import InvoicePreview from "./InvoicePreview";

export default function SaleScreen({
  draft,
  setDraft,
  products,
  storeName,
  saveSale,
}) {
  const [savedMsg, setSavedMsg] = useState("");

  const updateField = (field, value) => setDraft({ ...draft, [field]: value });

  const updateItem = (id, field, value) =>
    setDraft({
      ...draft,
      items: draft.items.map((it) =>
        it.id === id ? { ...it, [field]: value } : it
      ),
    });

  const addItem = () =>
    setDraft({
      ...draft,
      items: [
        ...draft.items,
        { id: Date.now(), description: "", quantity: 1, price: 0 },
      ],
    });

  const removeItem = (id) => {
    if (draft.items.length === 1) return; // always keep one row to type into
    setDraft({ ...draft, items: draft.items.filter((it) => it.id !== id) });
  };

  // tap a product chip: same item again = quantity +1,
  // otherwise fill the first empty row, otherwise add a new row
  const tapProduct = (p) => {
    const existing = draft.items.find((it) => it.description === p.name);
    if (existing) {
      updateItem(existing.id, "quantity", (Number(existing.quantity) || 0) + 1);
      return;
    }

    const empty = draft.items.find(
      (it) => it.description.trim() === "" && Number(it.price) === 0
    );

    if (empty) {
      setDraft({
        ...draft,
        items: draft.items.map((it) =>
          it.id === empty.id
            ? { ...it, description: p.name, quantity: 1, price: p.price }
            : it
        ),
      });
    } else {
      setDraft({
        ...draft,
        items: [
          ...draft.items,
          { id: Date.now(), description: p.name, quantity: 1, price: p.price },
        ],
      });
    }
  };

  const handleSave = () => {
    const ok = saveSale();
    setSavedMsg(
      ok
        ? "Saved ✓ — ready for the next customer"
        : "Add at least one item first"
    );
    setTimeout(() => setSavedMsg(""), 2500);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>New Sale</h2>

        {products.length > 0 && (
          <>
            <label className="form-label">Tap to add</label>
            <div className="chips">
              {products.map((p) => (
                <button
                  key={p.id}
                  className="chip"
                  onClick={() => tapProduct(p)}
                >
                  {p.name}
                  <em>₦{Number(p.price).toLocaleString()}</em>
                </button>
              ))}
            </div>
            <hr />
          </>
        )}

        <h3>Items</h3>

        {draft.items.map((item) => (
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

        <div className="form-group">
          <label className="form-label">Customer Name (empty = Walk-in)</label>
          <input
            className="form-input"
            value={draft.customer}
            onChange={(e) => updateField("customer", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Previous Balance (₦)</label>
          <input
            className="form-input"
            type="number"
            inputMode="numeric"
            min="0"
            value={draft.previousBalance}
            onChange={(e) =>
              updateField("previousBalance", Number(e.target.value))
            }
          />
        </div>

        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            className="form-input"
            type="date"
            value={draft.date}
            onChange={(e) => updateField("date", e.target.value)}
          />
        </div>

        <hr />

        <div className="action-row">
          <button
            className={draft.paid ? "btn btn-warn" : "btn btn-primary"}
            onClick={() => updateField("paid", !draft.paid)}
          >
            {draft.paid ? "Paid ✓ (tap to undo)" : "Mark as Paid ✓"}
          </button>

          <button className="btn btn-save" onClick={handleSave}>
            Save {draft.paid ? "Receipt" : "Invoice"} →
          </button>
        </div>

        {savedMsg && <p className="saved-msg">{savedMsg}</p>}
      </div>

      <InvoicePreview invoice={draft} storeName={storeName} />
    </div>
  );
}
