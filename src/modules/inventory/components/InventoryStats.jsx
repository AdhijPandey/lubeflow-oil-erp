
import React from "react";
import {
  Package,
  Boxes,
  AlertTriangle,
  PackageX,
  IndianRupee,
} from "lucide-react";

import {
  formatCurrency,
  getInventoryStats,
} from "../utils/inventoryHelpers";

const InventoryStats = ({ inventory = [] }) => {
  const stats = getInventoryStats(inventory);

  const cards = [
    {
      title: "TOTAL PRODUCTS",
      value: stats.totalProducts,
      icon: Package,
      color: "blue",
    },
    {
      title: "TOTAL STOCK UNITS",
      value: stats.totalUnits,
      icon: Boxes,
      color: "purple",
    },
    {
      title: "LOW STOCK",
      value: stats.lowStock,
      icon: AlertTriangle,
      color: "orange",
    },
    {
      title: "OUT OF STOCK",
      value: stats.outOfStock,
      icon: PackageX,
      color: "red",
    },
    {
      title: "STOCK VALUE",
      value: formatCurrency(stats.stockValue),
      icon: IndianRupee,
      color: "green",
    },
  ];

  const colors = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
    green: "bg-green-50 text-green-600",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  {card.title}
                </p>

                <h3 className="text-xl font-bold text-slate-800 mt-2">
                  {card.value}
                </h3>
              </div>

              <div className={`p-3 rounded-xl ${colors[card.color]}`}>
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InventoryStats;
