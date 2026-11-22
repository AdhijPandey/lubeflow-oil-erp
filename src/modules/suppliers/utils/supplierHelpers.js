
export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));

export const getSupplierStats = (suppliers = []) => ({
  totalSuppliers: suppliers.length,

  activeSuppliers: suppliers.filter(
    (item) => item.status === "ACTIVE"
  ).length,

  distributors: suppliers.filter(
    (item) => item.supplierType === "DISTRIBUTOR"
  ).length,

  manufacturers: suppliers.filter(
    (item) => item.supplierType === "MANUFACTURER"
  ).length,

  totalOutstanding: suppliers.reduce(
    (sum, item) => sum + Number(item.outstanding || 0),
    0
  ),
});

export const getSupplierTypeLabel = (type) => {
  const labels = {
    DISTRIBUTOR: "Distributor",
    MANUFACTURER: "Manufacturer",
    WHOLESALER: "Wholesaler",
    RETAILER: "Retailer",
    OTHER: "Other",
  };

  return labels[type] || type;
};
