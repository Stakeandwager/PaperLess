import { useState, useEffect } from "react";
import Header from "../components/Header";
import InvoiceForm from "../components/InvoiceForm";
import InvoicePreview from "../components/InvoicePreview";

const STORAGE_KEY = "paperless-invoice";

// what a brand-new invoice looks like
export const defaultInvoice = {
  company: "Simon Okoli Poultry",
  customer: "",
  date: "",
  previousBalance: 0,
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
  // lazy initializer: runs ONCE on first load.
  // Checks localStorage first; falls back to the default.
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
    <div style={styles.page}>
      <Header />

      <div style={styles.container}>
        <InvoiceForm invoice={invoice} setInvoice={setInvoice} />

        <InvoicePreview invoice={invoice} />
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
  },

  container: {
    display: "flex",
    flexWrap: "wrap", // ← cards stack on phones instead of squeezing
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "20px",
    padding: "16px",
  },
};