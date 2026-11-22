
export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount || 0));

export const calculateSaleTotals = ({
  items = [],
  discount = 0,
}) => {
  const subtotal = items.reduce(
    (sum, item) =>
      sum + Number(item.quantity) * Number(item.price),
    0
  );

  const taxableAmount = Math.max(
    0,
    subtotal - Number(discount || 0)
  );

  const gstAmount = items.reduce((sum, item) => {
    const itemAmount =
      Number(item.quantity) * Number(item.price);

    const itemDiscount =
      subtotal > 0
        ? Number(discount || 0) * (itemAmount / subtotal)
        : 0;

    return (
      sum +
      Math.max(0, itemAmount - itemDiscount) *
        (Number(item.gst || 0) / 100)
    );
  }, 0);

  const total = taxableAmount + gstAmount;

  return {
    subtotal,
    discount: Number(discount || 0),
    taxableAmount,
    gstAmount,
    total,
  };
};

export const getSaleStatus = (sale) => {
  if (Number(sale.due) <= 0) return "PAID";

  if (Number(sale.paid) > 0) return "PARTIAL";

  return "UNPAID";
};

export const getSalesStats = (sales) => ({
  totalSales: sales.length,

  totalRevenue: sales.reduce(
    (sum, sale) => sum + Number(sale.total || 0),
    0
  ),

  totalReceived: sales.reduce(
    (sum, sale) => sum + Number(sale.paid || 0),
    0
  ),

  totalDue: sales.reduce(
    (sum, sale) => sum + Number(sale.due || 0),
    0
  ),
});

export const generateInvoiceNumber = () => {
  const date = new Date();

  const year = date.getFullYear();

  return `INV-${year}-${Date.now().toString().slice(-6)}`;
};
