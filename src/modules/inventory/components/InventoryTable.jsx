
import React from "react";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

import {
  formatCurrency,
  getInventoryStatus,
} from "../utils/inventoryHelpers";

const statusStyles = {
  IN_STOCK: "bg-green-100 text-green-700",
  LOW_STOCK: "bg-orange-100 text-orange-700",
  OUT_OF_STOCK: "bg-red-100 text-red-700",
};

const statusLabels = {
  IN_STOCK: "In Stock",
  LOW_STOCK: "Low Stock",
  OUT_OF_STOCK: "Out of Stock",
};

const InventoryTable = ({ inventory, onAdjust }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              {[
                "Product",
                "SKU",
                "Brand",
                "Packaging",
                "Available Stock",
                "Minimum Stock",
                "Purchase Rate",
                "Stock Value",
                "Status",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-4 text-left font-semibold whitespace-nowrap"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {inventory.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-12 text-slate-400">
                  No inventory records found.
                </td>
              </tr>
            ) : (
              inventory.map((item) => {
                const stockStatus = getInventoryStatus(item);

                return (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-semibold text-slate-800">
                      {item.productName}
                    </td>

                    <td className="px-4 py-4">{item.sku}</td>

                    <td className="px-4 py-4">{item.brand}</td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {item.packaging}
                    </td>

                    <td className="px-4 py-4 font-bold">
                      {item.availableStock}
                    </td>

                    <td className="px-4 py-4">{item.minStock}</td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {formatCurrency(item.purchaseRate)}
                    </td>

                    <td className="px-4 py-4 font-semibold whitespace-nowrap">
                      {formatCurrency(
                        item.availableStock * item.purchaseRate
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[stockStatus]}`}
                      >
                        {statusLabels[stockStatus]}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onAdjust(item, "IN")}
                          title="Stock In"
                          className="p-2 rounded-lg text-green-600 hover:bg-green-50"
                        >
                          <ArrowDownToLine size={18} />
                        </button>

                        <button
                          onClick={() => onAdjust(item, "OUT")}
                          title="Stock Out"
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                        >
                          <ArrowUpFromLine size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
