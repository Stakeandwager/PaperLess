import ItemRow from "./ItemRow";

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
        item.id === id
          ? { ...item, [field]: value }
          : item
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
    setInvoice({
      ...invoice,
      items: invoice.items.filter(
        (item) => item.id !== id
      ),
    });
  };

  return (
    <div style={styles.card}>
      <h2>Invoice Details</h2>

      <div style={styles.group}>
        <label>Company Name</label>

        <input
          value={invoice.company}
          onChange={(e) =>
            updateField("company", e.target.value)
          }
        />
      </div>

      <div style={styles.group}>
        <label>Customer Name</label>

        <input
          value={invoice.customer}
          onChange={(e) =>
            updateField("customer", e.target.value)
          }
        />
      </div>

      <div style={styles.group}>
        <label>Date</label>

        <input
          type="date"
          value={invoice.date}
          onChange={(e) =>
            updateField("date", e.target.value)
          }
        />
      </div>

      <div style={styles.group}>
        <label>Previous Balance</label>

        <input
          type="number"
          value={invoice.previousBalance}
          onChange={(e) =>
            updateField(
              "previousBalance",
              Number(e.target.value)
            )
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

      <button onClick={addItem}>
        + Add Item
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
    width: "550px",
  },

  group: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "18px",
  },
};