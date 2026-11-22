
export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));

export const getCustomerStats = (customers = []) => ({
  totalCustomers: customers.length,

  retailCustomers: customers.filter(
    (item) => item.type === "RETAIL"
  ).length,

  wholesaleCustomers: customers.filter(
    (item) => item.type === "WHOLESALE"
  ).length,

  activeCustomers: customers.filter(
    (item) => item.status === "ACTIVE"
  ).length,

  totalOutstanding: customers.reduce(
    (sum, item) => sum + Number(item.outstanding || 0),
    0
  ),
});

export const getCustomerTypeLabel = (type) =>
  type === "WHOLESALE" ? "Wholesale" : "Retail";
