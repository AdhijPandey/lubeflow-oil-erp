
export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));

export const calculatePurchaseTotals = (
  items = [],
  discount = 0
) => {
  const subtotal = items.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 0) * Number(item.rate || 0),
    0
  );

  const safeDiscount = Math.max(
    0,
    Math.min(Number(discount || 0), subtotal)
  );

  const taxableAmount = subtotal - safeDiscount;

  const gstAmount = items.reduce((sum, item) => {
    const itemAmount =
      Number(item.quantity || 0) * Number(item.rate || 0);

    const itemDiscount =
      subtotal > 0
        ? (itemAmount / subtotal) * safeDiscount
        : 0;

    const taxableItem = itemAmount - itemDiscount;

    return (
      sum +
      (taxableItem * Number(item.gst || 0)) / 100
    );
  }, 0);

  const total = taxableAmount + gstAmount;

  return {
    subtotal,
    discount: safeDiscount,
    gstAmount,
    total,
  };
};

export const getPurchaseStatus = (purchase) => {
  const total = Number(purchase.total || 0);
  const paid = Number(purchase.paidAmount || 0);

  if (paid <= 0) return "UNPAID";
  if (paid >= total) return "PAID";
  return "PARTIAL";
};

export const getPurchaseStats = (purchases = []) => ({
  totalPurchases: purchases.length,

  totalAmount: purchases.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0
  ),

  totalPaid: purchases.reduce(
    (sum, item) => sum + Number(item.paidAmount || 0),
    0
  ),

  totalDue: purchases.reduce(
    (sum, item) => sum + Number(item.dueAmount || 0),
    0
  ),
});
