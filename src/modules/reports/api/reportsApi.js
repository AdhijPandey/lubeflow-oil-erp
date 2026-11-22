
import { getSales } from "../../sales/api/salesApi";
import { getPurchases } from "../../purchase/api/purchaseApi";
import { getInventory } from "../../inventory/api/inventoryApi";
import { getCustomers } from "../../customers/api/customerApi";
import { getSuppliers } from "../../suppliers/api/supplierApi";

const getDate = (item, fields) => {
  for (const field of fields) {
    if (item?.[field]) return String(item[field]).slice(0, 10);
  }
  return "";
};

const inDateRange = (date, fromDate, toDate) => {
  if (!date) return false;

  return (
    (!fromDate || date >= fromDate) &&
    (!toDate || date <= toDate)
  );
};

export const getReportData = async ({
  reportType = "SALES",
  fromDate = "",
  toDate = "",
} = {}) => {
  const [
    sales,
    purchases,
    inventory,
    customers,
    suppliers,
  ] = await Promise.all([
    getSales(),
    getPurchases(),
    getInventory(),
    getCustomers(),
    getSuppliers(),
  ]);

  const filteredSales = sales.filter((item) =>
    inDateRange(
      getDate(item, ["saleDate", "date", "createdAt"]),
      fromDate,
      toDate
    )
  );

  const filteredPurchases = purchases.filter((item) =>
    inDateRange(
      getDate(item, ["purchaseDate", "date", "createdAt"]),
      fromDate,
      toDate
    )
  );

  const salesTotal = filteredSales.reduce(
    (sum, item) => sum + Number(item.total || item.grandTotal || 0),
    0
  );

  const purchaseTotal = filteredPurchases.reduce(
    (sum, item) => sum + Number(item.total || item.grandTotal || 0),
    0
  );

  const salesReceived = filteredSales.reduce(
    (sum, item) => sum + Number(item.paidAmount || item.receivedAmount || 0),
    0
  );

  const salesDue = filteredSales.reduce(
    (sum, item) => sum + Number(item.dueAmount || 0),
    0
  );

  const purchasePaid = filteredPurchases.reduce(
    (sum, item) => sum + Number(item.paidAmount || 0),
    0
  );

  const purchaseDue = filteredPurchases.reduce(
    (sum, item) => sum + Number(item.dueAmount || 0),
    0
  );

  const stockValue = inventory.reduce(
    (sum, item) =>
      sum +
      Number(item.availableStock || 0) *
        Number(item.purchaseRate || 0),
    0
  );

  const commonSummary = {
    salesTotal,
    purchaseTotal,
    salesReceived,
    salesDue,
    purchasePaid,
    purchaseDue,
    stockValue,
    totalCustomers: customers.length,
    totalSuppliers: suppliers.length,
  };

  switch (reportType) {
    case "SALES":
      return {
        summary: commonSummary,
        columns: [
          { key: "saleNo", label: "Invoice No." },
          { key: "customer", label: "Customer" },
          { key: "date", label: "Date" },
          { key: "saleType", label: "Sale Type" },
          { key: "total", label: "Total Amount" },
          { key: "paidAmount", label: "Received" },
          { key: "dueAmount", label: "Due" },
          { key: "status", label: "Status" },
        ],
        rows: filteredSales.map((item) => ({
          saleNo: item.invoiceNo || item.saleNo || "-",
          customer: item.customerName || item.customer || "-",
          date: getDate(item, ["saleDate", "date", "createdAt"]),
          saleType: item.saleType || "-",
          total: Number(item.total || item.grandTotal || 0),
          paidAmount: Number(item.paidAmount || item.receivedAmount || 0),
          dueAmount: Number(item.dueAmount || 0),
          status: item.status || "-",
        })),
      };

    case "PURCHASE":
      return {
        summary: commonSummary,
        columns: [
          { key: "purchaseNo", label: "Purchase No." },
          { key: "supplier", label: "Supplier" },
          { key: "date", label: "Date" },
          { key: "total", label: "Purchase Amount" },
          { key: "paidAmount", label: "Paid" },
          { key: "dueAmount", label: "Due" },
          { key: "status", label: "Status" },
        ],
        rows: filteredPurchases.map((item) => ({
          purchaseNo: item.purchaseNo || "-",
          supplier: item.supplier || "-",
          date: getDate(item, ["purchaseDate", "date", "createdAt"]),
          total: Number(item.total || item.grandTotal || 0),
          paidAmount: Number(item.paidAmount || 0),
          dueAmount: Number(item.dueAmount || 0),
          status: item.status || "-",
        })),
      };

    case "INVENTORY":
      return {
        summary: commonSummary,
        columns: [
          { key: "productName", label: "Product" },
          { key: "sku", label: "SKU" },
          { key: "packaging", label: "Packaging" },
          { key: "availableStock", label: "Available Stock" },
          { key: "minStock", label: "Minimum Stock" },
          { key: "purchaseRate", label: "Purchase Rate" },
          { key: "stockValue", label: "Stock Value" },
          { key: "status", label: "Status" },
        ],
        rows: inventory.map((item) => {
          const quantity = Number(item.availableStock || 0);
          const minimum = Number(item.minStock || 0);

          return {
            productName: item.productName,
            sku: item.sku,
            packaging: item.packaging,
            availableStock: quantity,
            minStock: minimum,
            purchaseRate: Number(item.purchaseRate || 0),
            stockValue: quantity * Number(item.purchaseRate || 0),
            status:
              quantity <= 0
                ? "OUT OF STOCK"
                : quantity <= minimum
                ? "LOW STOCK"
                : "IN STOCK",
          };
        }),
      };

    case "CUSTOMERS":
      return {
        summary: commonSummary,
        columns: [
          { key: "customerCode", label: "Customer Code" },
          { key: "name", label: "Customer" },
          { key: "type", label: "Type" },
          { key: "phone", label: "Mobile" },
          { key: "creditLimit", label: "Credit Limit" },
          { key: "outstanding", label: "Outstanding" },
          { key: "status", label: "Status" },
        ],
        rows: customers.map((item) => ({
          customerCode: item.customerCode,
          name: item.name,
          type: item.type,
          phone: item.phone,
          creditLimit: Number(item.creditLimit || 0),
          outstanding: Number(item.outstanding || 0),
          status: item.status,
        })),
      };

    case "SUPPLIERS":
      return {
        summary: commonSummary,
        columns: [
          { key: "supplierCode", label: "Supplier Code" },
          { key: "companyName", label: "Supplier" },
          { key: "supplierType", label: "Type" },
          { key: "phone", label: "Mobile" },
          { key: "creditLimit", label: "Credit Limit" },
          { key: "outstanding", label: "Outstanding" },
          { key: "status", label: "Status" },
        ],
        rows: suppliers.map((item) => ({
          supplierCode: item.supplierCode,
          companyName: item.companyName,
          supplierType: item.supplierType,
          phone: item.phone,
          creditLimit: Number(item.creditLimit || 0),
          outstanding: Number(item.outstanding || 0),
          status: item.status,
        })),
      };

    case "PROFIT_LOSS":
      return {
        summary: commonSummary,
        columns: [
          { key: "particular", label: "Particulars" },
          { key: "amount", label: "Amount" },
        ],
        rows: [
          { particular: "Sales Revenue", amount: salesTotal },
          { particular: "Purchase Value", amount: purchaseTotal },
          {
            particular: "Difference (Sales - Purchases)",
            amount: salesTotal - purchaseTotal,
          },
          { particular: "Sales Receivable", amount: salesDue },
          { particular: "Supplier Payable", amount: purchaseDue },
        ],
      };

    default:
      throw new Error("Unsupported report type.");
  }
};
