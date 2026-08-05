import { useState, useEffect } from "react";
import InvoiceForm from "../components/InvoiceForm";
import InvoicePreview from "../components/InvoicePreview";

const STORAGE_KEY = "paperless-invoice";

// what a brand-new invoice looks like
const defaultInvoice = {
  company: "Simon Okoli Poultry",
  customer: "John Okoli",
  date: "",
  previousBalance: 43000,
  paid: false,

  items: [
    {
      id: 1,
      description: "",
      quantity: 1,
      price: 0,
    },
  ],
};

export default function Home() {
  // lazy initializer: this function runs ONCE, on first load.
  // It checks localStorage first; if nothing is saved, uses the default.
  const [invoice, setInvoice] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultInvoice;
    } catch {
      return defaultInvoice;
    }
  });

  // every time the invoice changes, save it.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoice));
  }, [invoice]);

  return (
    <div style={styles.container}>
      <InvoiceForm invoice={invoice} setInvoice={setInvoice} />

      <InvoicePreview invoice={invoice} />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "30px",
    background: "#f5f7fb",
    padding: "40px",
  },
};