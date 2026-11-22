
import React from "react";
import {
  IndianRupee,
  ShoppingCart,
  Wallet,
  Package,
} from "lucide-react";

import { formatCurrency } from "../utils/reportsHelpers";

const ReportSummaryCards = ({ summary = {}, reportType }) => {
  const configurations = {
    SALES: [
      ["Sales Revenue", summary.salesTotal, IndianRupee, "blue"],
      ["Received Amount", summary.salesReceived, Wallet, "green"],
      ["Outstanding Due", summary.salesDue, ShoppingCart, "orange"],
      ["Total Invoices", summary.salesCount ?? "-", Package, "purple"],
    ],
    PURCHASE: [
      ["Purchase Amount", summary.purchaseTotal, IndianRupee, "blue"],
      ["Paid Amount", summary.purchasePaid, Wallet, "green"],
      ["Outstanding Due", summary.purchaseDue, ShoppingCart, "orange"],
      ["Total Purchases", summary.purchaseCount ?? "-", Package, "purple"],
    ],
    INVENTORY: [
      ["Stock Value", summary.stockValue, IndianRupee, "blue"],
      ["Products", summary.inventoryCount ?? "-", Package, "purple"],
      ["Low Stock", summary.lowStock ?? "-", ShoppingCart, "orange"],
      ["Out of Stock", summary.outOfStock ?? "-", Wallet, "red"],
    ],
    CUSTOMERS: [
      ["Total Customers", summary.totalCustomers, Package, "blue"],
      ["Retail Customers", summary.retailCustomers ?? "-", ShoppingCart, "purple"],
      ["Wholesale Customers", summary.wholesaleCustomers ?? "-", Wallet, "green"],
      ["Outstanding", summary.customerOutstanding ?? 0, IndianRupee, "orange"],
    ],
    SUPPLIERS: [
      ["Total Suppliers", summary.totalSuppliers, Package, "blue"],
      ["Active Suppliers", summary.activeSuppliers ?? "-", ShoppingCart, "green"],
      ["Distributors", summary.distributors ?? "-", Wallet, "purple"],
      ["Outstanding Payable", summary.supplierOutstanding ?? 0, IndianRupee, "orange"],
    ],
    PROFIT_LOSS: [
      ["Sales Revenue", summary.salesTotal, IndianRupee, "blue"],
      ["Purchase Value", summary.purchaseTotal, ShoppingCart, "purple"],
      [
        "Sales - Purchases",
        Number(summary.salesTotal || 0) - Number(summary.purchaseTotal || 0),
        Wallet,
        "green",
      ],
      ["Sales Due", summary.salesDue, Package, "orange"],
    ],
  };

  const cards = configurations[reportType] || [];
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
    red: "bg-red-50 text-red-600",
  };

  const countCards = [
    "Total Invoices",
    "Total Purchases",
    "Products",
    "Low Stock",
    "Out of Stock",
    "Total Customers",
    "Retail Customers",
    "Wholesale Customers",
    "Total Suppliers",
    "Active Suppliers",
    "Distributors",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(([title, value, Icon, color]) => (
        <div
          key={title}
          className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                {title.toUpperCase()}
              </p>
              <h3 className="text-xl font-bold text-slate-800 mt-2">
                {value === "-" || countCards.includes(title)
                  ? value
                  : formatCurrency(value)}
              </h3>
            </div>
            <div className={`p-3 rounded-xl ${colors[color]}`}>
              <Icon size={22} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportSummaryCards;
