import React from "react";
import { ArrowUpRight } from "lucide-react";

const QuickActions = ({ actions = [], onAction }) => {
  return (
    <section className="mt-8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#20252D]">
            Quick Actions
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Frequently used shop operations
          </p>
        </div>

        <ArrowUpRight size={20} className="text-gray-400" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.name}
              type="button"
              onClick={() => onAction?.(action.name)}
              className="group flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E53935]/40 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-100"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#E53935] transition group-hover:bg-[#E53935] group-hover:text-white">
                {Icon && <Icon size={23} />}
              </div>

              <span className="text-center text-xs font-bold text-gray-700 group-hover:text-[#E53935]">
                {action.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;