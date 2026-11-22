
import React from "react";
import {
  ShoppingCart,
  IndianRupee,
  Wallet,
  Clock,
} from "lucide-react";

import {
  formatCurrency,
  getPurchaseStats,
} from "../utils/purchaseHelpers";

const PurchaseStats = ({ purchases = [] }) => {
  const stats = getPurchaseStats(purchases);

  const cards = [
    {
      title: "TOTAL PURCHASES",
      value: stats.totalPurchases,
      icon: ShoppingCart,
      color: "blue",
      description: "Total purchase entries",
    },
    {
      title: "PURCHASE AMOUNT",
      value: formatCurrency(stats.totalAmount),
      icon: IndianRupee,
      color: "purple",
      description: "Total purchase value",
    },
    {
      title: "PAID AMOUNT",
      value: formatCurrency(stats.totalPaid),
      icon: Wallet,
      color: "green",
      description: "Amount paid to suppliers",
    },
    {
      title: "OUTSTANDING DUE",
      value: formatCurrency(stats.totalDue),
      icon: Clock,
      color: "orange",
      description: "Pending supplier payments",
    },
  ];

  const colors = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
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

            <p className="text-xs text-slate-400 mt-3">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PurchaseStats;
