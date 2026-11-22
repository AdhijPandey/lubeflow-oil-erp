
export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));

export const getInventoryStatus = (item) => {
  if (Number(item.availableStock) <= 0) {
    return "OUT_OF_STOCK";
  }

  if (Number(item.availableStock) <= Number(item.minStock)) {
    return "LOW_STOCK";
  }

  return "IN_STOCK";
};

export const getInventoryStats = (inventory = []) => {
  return {
    totalProducts: inventory.length,

    totalUnits: inventory.reduce(
      (sum, item) => sum + Number(item.availableStock || 0),
      0
    ),

    lowStock: inventory.filter(
      (item) => getInventoryStatus(item) === "LOW_STOCK"
    ).length,

    outOfStock: inventory.filter(
      (item) => getInventoryStatus(item) === "OUT_OF_STOCK"
    ).length,

    stockValue: inventory.reduce(
      (sum, item) =>
        sum +
        Number(item.availableStock || 0) *
          Number(item.purchaseRate || 0),
      0
    ),
  };
};
