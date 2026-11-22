
import React from "react";
import {
  Package,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

const ProductStats = ({ stats }) => {
  const cards = [
    {
      title: "TOTAL PRODUCTS",
      value: stats.total,
      icon: Package,
      color: "blue",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "ACTIVE PRODUCTS",
      value: stats.active,
      icon: CheckCircle2,
      color: "green",
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "LOW STOCK",
      value: stats.lowStock,
      icon: AlertTriangle,
      color: "orange",
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
    {
      title: "OUT OF STOCK",
      value: stats.outOfStock,
      icon: XCircle,
      color: "red",
      bg: "bg-red-50",
      text: "text-red-600",
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
                <p className="text-xs font-semibold tracking-wide text-gray-500">
                  {card.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-gray-900">
                  {card.value}
                </h3>
              </div>

              <div className={`rounded-xl p-3 ${card.bg} ${card.text}`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductStats;
