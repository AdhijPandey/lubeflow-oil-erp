import React from "react";
import { ArrowUpRight, AlertCircle } from "lucide-react";

const DashboardStats = ({ stats = [] }) => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className={`group rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
              stat.alert
                ? "border-orange-200"
                : "border-gray-200 hover:border-red-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500">
                {stat.title}
              </p>

              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}>
                <Icon size={20} />
              </div>
            </div>

            <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-[#20252D]">
              {stat.value}
            </h3>

            <div className="mt-3 flex items-center gap-1.5">
              {stat.alert ? (
                <AlertCircle size={14} className="text-orange-500" />
              ) : (
                <ArrowUpRight size={14} className="text-green-600" />
              )}

              <p className={`text-[11px] font-medium ${
                stat.alert ? "text-orange-600" : "text-gray-500"
              }`}>
                {stat.change}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default DashboardStats;