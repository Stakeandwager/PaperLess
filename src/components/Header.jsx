export default function Header({ storeName }) {
  return (
    <header className="pl-header">
      <div className="pl-brand">
        Paper<span className="pl-accent">Less</span>
      </div>

      <p className="pl-tagline">{storeName}</p>
    </header>
  );
}
