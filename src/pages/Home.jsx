import { useState, useEffect } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import SaleScreen from "../components/SaleScreen";
import HistoryScreen from "../components/HistoryScreen";
import ProductsScreen from "../components/ProductsScreen";
import SettingsScreen from "../components/SettingsScreen";

const STORAGE_KEY = "paperless-store";

// a fresh sale, ready to type into — date defaults to today
export const newDraft = () => ({
  customer: "",
  date: new Date().toISOString().slice(0, 10),
  previousBalance: 0,
  paid: false,
  items: [{ id: Date.now(), description: "", quantity: 1, price: 0 }],
});

const defaultData = {
  storeName: "My Store",
  products: [],
  invoices: [],
  draft: newDraft(),
};

export default function Home() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    } catch {
      return defaultData;
    }
  });

  const [tab, setTab] = useState("sale");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  /* ---- the sale being typed right now ---- */
  const setDraft = (draft) => setData({ ...data, draft });

  // archive the draft into history and start a fresh one
  const saveSale = () => {
    const items = data.draft.items.filter(
      (it) => it.description.trim() !== "" || Number(it.price) > 0
    );
    if (items.length === 0) return false;

    const invoice = {
      ...data.draft,
      items,
      id: Date.now(),
      number: String(data.invoices.length + 1).padStart(3, "0"),
      customer: data.draft.customer.trim() || "Walk-in",
    };

    setData({
      ...data,
      invoices: [invoice, ...data.invoices], // newest first
      draft: newDraft(),
    });
    return true;
  };

  /* ---- saved invoices ---- */
  const togglePaid = (id) =>
    setData({
      ...data,
      invoices: data.invoices.map((inv) =>
        inv.id === id ? { ...inv, paid: !inv.paid } : inv
      ),
    });

  /* ---- product catalog ---- */
  const addProduct = (name, price) =>
    setData({
      ...data,
      products: [...data.products, { id: Date.now(), name, price }],
    });

  const removeProduct = (id) =>
    setData({
      ...data,
      products: data.products.filter((p) => p.id !== id),
    });

  /* ---- settings ---- */
  const setStoreName = (storeName) => setData({ ...data, storeName });

  return (
    <div className="page">
      <Header storeName={data.storeName} />

      {tab === "sale" && (
        <SaleScreen
          draft={data.draft}
          setDraft={setDraft}
          products={data.products}
          storeName={data.storeName}
          saveSale={saveSale}
        />
      )}

      {tab === "history" && (
        <HistoryScreen
          invoices={data.invoices}
          storeName={data.storeName}
          togglePaid={togglePaid}
        />
      )}

      {tab === "products" && (
        <ProductsScreen
          products={data.products}
          addProduct={addProduct}
          removeProduct={removeProduct}
        />
      )}

      {tab === "settings" && (
        <SettingsScreen
          storeName={data.storeName}
          setStoreName={setStoreName}
          invoiceCount={data.invoices.length}
        />
      )}

      <NavBar tab={tab} setTab={setTab} />
    </div>
  );
}
