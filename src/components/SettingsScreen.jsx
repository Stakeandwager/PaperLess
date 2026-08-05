export default function SettingsScreen({
  storeName,
  setStoreName,
  invoiceCount,
}) {
  return (
    <div className="container">
      <div className="card">
        <h2>Owner Settings</h2>

        <div className="form-group">
          <label className="form-label">Store Name</label>
          <input
            className="form-input"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
          <p className="empty-note" style={{ textAlign: "left" }}>
            Shown on every invoice and receipt.
          </p>
        </div>

        <hr />

        <p>
          <strong>Sales saved on this device:</strong> {invoiceCount}
        </p>

        <p className="empty-note" style={{ textAlign: "left" }}>
          ⚠️ All data lives on this phone only. Clearing the browser's data
          will erase it. During the trial, keep the receipt book alongside
          as backup.
        </p>
      </div>
    </div>
  );
}
