export default function ItemRow({ item, updateItem, removeItem }) {
  return (
    <div className="item-row">
      <input
        className="item-input"
        type="text"
        placeholder="Description"
        value={item.description}
        onChange={(e) =>
          updateItem(item.id, "description", e.target.value)
        }
      />

      <input
        className="item-input"
        type="number"
        min="0"
        step="0.1"
        inputMode="decimal"
        placeholder="Qty"
        value={item.quantity}
        onChange={(e) =>
          updateItem(item.id, "quantity", Number(e.target.value))
        }
      />

      <input
        className="item-input"
        type="number"
        min="0"
        inputMode="numeric"
        placeholder="Price (₦)"
        value={item.price}
        onChange={(e) =>
          updateItem(item.id, "price", Number(e.target.value))
        }
      />

      <button
        className="remove-btn"
        type="button"
        onClick={() => removeItem(item.id)}
        title="Remove Item"
      >
        ✕
      </button>
    </div>
  );
}
