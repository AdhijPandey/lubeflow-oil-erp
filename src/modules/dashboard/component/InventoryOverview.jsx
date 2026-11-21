import React from "react";
import {
  Boxes,
  AlertTriangle,
  ArrowRight,
  Package,
} from "lucide-react";
import { inventoryData, lowStockItems } from "../data/dashboardData";

const InventoryOverview = ({ onViewInventory }) => {
  return (
    <section className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-2">

      {/* STOCK OVERVIEW */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-[#20252D]">Stock Overview</h2>
            <p className="mt-1 text-xs text-gray-500">
              Category-wise available inventory
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Boxes size={21} />
          </div>
        </div>

        <div className="space-y-5">
          {inventoryData.map((item) => (
            <div key={item.name}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">
                  {item.name}
                </span>

                <span className="text-xs font-bold text-gray-600">
                  {item.quantity} {item.unit}
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onViewInventory}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-xs font-bold text-gray-600 transition hover:border-[#E53935] hover:text-[#E53935]"
        >
          View Full Inventory
          <ArrowRight size={15} />
        </button>
      </div>

      {/* LOW STOCK ALERT */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-[#20252D]">Low Stock Alerts</h2>
            <p className="mt-1 text-xs text-gray-500">
              Products that need restocking
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <AlertTriangle size={21} />
          </div>
        </div>

        <div className="space-y-3">
          {lowStockItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 p-3 transition hover:border-orange-200 hover:bg-orange-50/30"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                  <Package size={19} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-500">
                    {item.brand} · Minimum {item.minimum} {item.unit}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-extrabold text-red-600">
                  {item.stock} {item.unit}
                </p>
                <span className="text-[10px] font-semibold text-red-500">
                  Low Stock
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onViewInventory}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-50 py-3 text-xs font-bold text-orange-700 transition hover:bg-orange-100"
        >
          Manage Stock
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
};

export default InventoryOverview;