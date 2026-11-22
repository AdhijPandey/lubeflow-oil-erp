
import React from "react";
import {
  ShoppingCart,
  IndianRupee,
  Wallet,
  Clock,
} from "lucide-react";

import { formatCurrency } from "../utils/salesHelpers";

const SalesStats = ({ stats }) => {
  const cards = [
    {
      title: "TOTAL INVOICES",
      value: stats.totalSales,
      icon: ShoppingCart,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "TOTAL REVENUE",
      value: formatCurrency(stats.totalRevenue),
      icon: IndianRupee,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "AMOUNT RECEIVED",
      value: formatCurrency(stats.totalReceived),
      icon: Wallet,
      bg: "bg-purple-50",
      color: "text-purple-600",
    },
    {
      title: "PENDING PAYMENT",
      value: formatCurrency(stats.totalDue),
      icon: Clock,
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500">
                  {card.title}
                </p>

                <h3 className="mt-3 text-2xl font-bold text-gray-900">
                  {card.value}
                </h3>
              </div>

              <div className={`rounded-xl p-3 ${card.bg} ${card.color}`}>
                <Icon size={23} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SalesStats;
