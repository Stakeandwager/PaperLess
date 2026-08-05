// All invoice math lives here.
// One place to fix bugs, one place to change rules later (e.g. adding VAT).

export function lineTotal(item) {
  return (Number(item.quantity) || 0) * (Number(item.price) || 0);
}

export function subtotal(items) {
  return items.reduce((sum, item) => sum + lineTotal(item), 0);
}

export function grandTotal(invoice) {
  return subtotal(invoice.items) + (Number(invoice.previousBalance) || 0);
}

export function formatNaira(amount) {
  return "₦" + (Number(amount) || 0).toLocaleString();
}
