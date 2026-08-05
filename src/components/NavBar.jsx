const TABS = [
  { id: "sale", icon: "🧾", label: "Sale" },
  { id: "history", icon: "📜", label: "History" },
  { id: "products", icon: "🛒", label: "Products" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

export default function NavBar({ tab, setTab }) {
  return (
    <nav className="navbar">
      {TABS.map((t) => (
        <button
          key={t.id}
          className={"nav-btn" + (tab === t.id ? " active" : "")}
          onClick={() => setTab(t.id)}
        >
          <span className="nav-icon">{t.icon}</span>
          <span className="nav-label">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
