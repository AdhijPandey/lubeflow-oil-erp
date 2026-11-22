
import React from "react";
import { formatCurrency } from "../utils/inventoryHelpers";

const StockMovement = ({ movements = [] }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-5 border-b">
        <h2 className="font-bold text-slate-800">Stock Movement History</h2>
        <p className="text-sm text-slate-500 mt-1">
          Track every stock in and stock out entry.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="bg-slate-50">
            <tr>
              {[
                "Date",
                "Product",
                "SKU",
                "Movement",
                "Quantity",
                "Reason",
                "Reference",
                "Balance",
              ].map((heading) => (
                <th key={heading} className="p-4 text-left font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {movements.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-12 text-slate-400">
                  No stock movements available.
                </td>
              </tr>
            ) : (
              movements.map((movement) => (
                <tr key={movement.id}>
                  <td className="p-4 whitespace-nowrap">
                    {new Date(movement.date).toLocaleString("en-IN")}
                  </td>
                  <td className="p-4">{movement.productName}</td>
                  <td className="p-4">{movement.sku}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        movement.type === "IN"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {movement.type}
                    </span>
                  </td>
                  <td className="p-4 font-semibold">
                    {movement.quantity}
                  </td>
                  <td className="p-4">{movement.reason}</td>
                  <td className="p-4">{movement.reference || "-"}</td>
                  <td className="p-4 font-semibold">
                    {movement.balance}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockMovement;
