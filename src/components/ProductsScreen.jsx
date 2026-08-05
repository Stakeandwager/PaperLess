import { useState } from "react";
import { formatNaira } from "../utils/calculateTotal";

export default function ProductsScreen({ products, addProduct, removeProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = () => {
    if (name.trim() === "" || !(Number(price) > 0)) return;
    addProduct(name.trim(), Number(price));
    setName("");
    setPrice("");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Products</h2>

        <p className="empty-note" style={{ textAlign: "left" }}>
          Add what you sell once — then every sale is one tap.
        </p>

        <div className="product-add">
          <input
            className="form-input"
            placeholder="Item name (e.g. Indomie carton)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="form-input"
            type="number"
            inputMode="numeric"
            min="0"
            placeholder="Price (₦)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />

          <button className="btn btn-primary" onClick={handleAdd}>
            Add
          </button>
        </div>

        <hr />

        {products.length === 0 && (
          <p className="empty-note">No products yet.</p>
        )}

        {products.map((p) => (
          <div key={p.id} className="product-row">
            <span className="history-name">{p.name}</span>

            <div className="history-right">
              <span className="history-total">{formatNaira(p.price)}</span>
              <button
                className="remove-btn"
                onClick={() => removeProduct(p.id)}
                title="Remove product"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
