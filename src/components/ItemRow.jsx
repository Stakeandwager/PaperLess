import "../styles/forms.css";
import "../styles/buttons.css";

export default function ItemRow({
  item,
  updateItem,
  removeItem,
}) {
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
        className="item-input qty-input"
        type="number"
        min="1"
        placeholder="Qty"
        value={item.quantity}
        onChange={(e) =>
          updateItem(
            item.id,
            "quantity",
            Number(e.target.value)
          )
        }
      />

      <input
        className="item-input price-input"
        type="number"
        min="0"
        placeholder="Price (₦)"
        value={item.price}
        onChange={(e) =>
          updateItem(
            item.id,
            "price",
            Number(e.target.value)
          )
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