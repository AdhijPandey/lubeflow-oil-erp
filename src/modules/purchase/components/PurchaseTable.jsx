
import React from "react";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { formatCurrency } from "../utils/purchaseHelpers";

const statusStyle = {
  PAID: "bg-green-100 text-green-700",
  PARTIAL: "bg-orange-100 text-orange-700",
  UNPAID: "bg-red-100 text-red-700",
};

const PurchaseTable = ({
  purchases,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              {[
                "Purchase No.",
                "Date",
                "Supplier",
                "Supplier Invoice",
                "Items",
                "Total Amount",
                "Paid",
                "Due",
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
            {purchases.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-12 text-slate-400"
                >
                  No purchase records found.
                </td>
              </tr>
            ) : (
              purchases.map((purchase) => (
                <tr
                  key={purchase.id}
                  className="hover:bg-slate-50"
                >
                  <td className="px-4 py-4 font-semibold text-blue-600 whitespace-nowrap">
                    {purchase.purchaseNo}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    {purchase.purchaseDate}
                  </td>

                  <td className="px-4 py-4">
                    <p className="font-medium text-slate-800">
                      {purchase.supplier}
                    </p>
                    <p className="text-xs text-slate-400">
                      {purchase.supplierPhone}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    {purchase.supplierInvoice}
                  </td>

                  <td className="px-4 py-4">
                    {purchase.items?.length || 0}
                  </td>

                  <td className="px-4 py-4 font-semibold whitespace-nowrap">
                    {formatCurrency(purchase.total)}
                  </td>

                  <td className="px-4 py-4 text-green-700 whitespace-nowrap">
                    {formatCurrency(purchase.paidAmount)}
                  </td>

                  <td className="px-4 py-4 text-red-600 whitespace-nowrap">
                    {formatCurrency(purchase.dueAmount)}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusStyle[purchase.status] ||
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {purchase.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onView(purchase)}
                        title="View"
                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() => onEdit(purchase)}
                        title="Edit"
                        className="p-2 rounded-lg text-green-600 hover:bg-green-50"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => onDelete(purchase.id)}
                        title="Delete"
                        className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
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

export default PurchaseTable;
