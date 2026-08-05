export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.brand}>
        Paper<span style={styles.accent}>Less</span>
      </div>

      <p style={styles.tagline}>Invoices &amp; receipts in seconds.</p>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "4px",
    padding: "14px 20px",
    background: "#fff",
    borderBottom: "1px solid #e5e7eb",
  },

  brand: {
    fontSize: "22px",
    fontWeight: 800,
    color: "#182420",
  },

  accent: {
    color: "#1E6B4E",
  },

  tagline: {
    margin: 0,
    color: "#75817B",
    fontSize: "13px",
  },
};