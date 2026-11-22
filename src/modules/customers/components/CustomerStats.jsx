
import React from "react";
import {
  Users,
  Store,
  Building2,
  UserCheck,
  Wallet,
} from "lucide-react";

import {
  formatCurrency,
  getCustomerStats,
} from "../utils/customerHelpers";

const CustomerStats = ({ customers = [] }) => {
  const stats = getCustomerStats(customers);

  const cards = [
    {
      title: "TOTAL CUSTOMERS",
      value: stats.totalCustomers,
      icon: Users,
      color: "blue",
    },
    {
      title: "RETAIL CUSTOMERS",
      value: stats.retailCustomers,
      icon: Store,
      color: "purple",
    },
    {
      title: "WHOLESALE CUSTOMERS",
      value: stats.wholesaleCustomers,
      icon: Building2,
      color: "indigo",
    },
    {
      title: "ACTIVE CUSTOMERS",
      value: stats.activeCustomers,
      icon: UserCheck,
      color: "green",
    },
    {
      title: "OUTSTANDING",
      value: formatCurrency(stats.totalOutstanding),
      icon: Wallet,
      color: "orange",
    },
  ];

  const colors = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    indigo: "bg-indigo-50 text-indigo-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
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
            <div className="flex justify-between items-center gap-2">
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

export default CustomerStats;
