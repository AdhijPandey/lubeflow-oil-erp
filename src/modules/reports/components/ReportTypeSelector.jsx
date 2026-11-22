
import React from "react";
import {
  ChartNoAxesCombined,
  ShoppingCart,
  Package,
  Users,
  Truck,
  Wallet,
} from "lucide-react";

const reportTypes = [
  { value: "SALES", label: "Sales Report", icon: ChartNoAxesCombined },
  { value: "PURCHASE", label: "Purchase Report", icon: ShoppingCart },
  { value: "INVENTORY", label: "Inventory Report", icon: Package },
  { value: "CUSTOMERS", label: "Customer Report", icon: Users },
  { value: "SUPPLIERS", label: "Supplier Report", icon: Truck },
  { value: "PROFIT_LOSS", label: "Profit & Loss", icon: Wallet },
];

const ReportTypeSelector = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
      {reportTypes.map((report) => {
        const Icon = report.icon;
        const active = value === report.value;

        return (
          <button
            key={report.value}
            onClick={() => onChange(report.value)}
            className={`flex flex-col items-start gap-3 p-4 rounded-xl border text-left transition ${
              active
                ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-slate-50"
            }`}
          >
            <Icon size={22} />
            <span className="text-sm font-semibold">
              {report.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ReportTypeSelector;
