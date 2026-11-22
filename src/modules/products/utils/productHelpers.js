
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));
};

export const getProductStatus = (product) => {
  if (product.status === "INACTIVE") return "INACTIVE";

  if (Number(product.stock) <= 0) return "OUT OF STOCK";

  if (Number(product.stock) <= Number(product.minStock)) {
    return "LOW STOCK";
  }

  return "ACTIVE";
};

export const getProductStats = (products) => ({
  total: products.length,
  active: products.filter(
    (p) => p.status === "ACTIVE"
  ).length,
  lowStock: products.filter(
    (p) =>
      p.status === "ACTIVE" &&
      Number(p.stock) > 0 &&
      Number(p.stock) <= Number(p.minStock)
  ).length,
  outOfStock: products.filter(
    (p) =>
      p.status === "ACTIVE" &&
      Number(p.stock) <= 0
  ).length,
});
