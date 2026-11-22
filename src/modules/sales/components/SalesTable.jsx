
import React from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Printer,
} from "lucide-react";

import {
  formatCurrency,
  getSaleStatus,
} from "../utils/salesHelpers";

const SalesTable = ({
  sales,
  onView,
  onEdit,
  onDelete,
  onInvoice,
}) => {
  const statusClasses = {
    PAID: "bg-green-50 text-green-700",
    PARTIAL: "bg-orange-50 text-orange-700",
    UNPAID: "bg-red-50 text-red-700",
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] text-left">

          <thead className="bg-gray-50">
            <tr className="border-b text-xs font-semibold uppercase text-gray-500">
              <th className="px-5 py-4">Invoice No.</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Type</th>
              <th className="px-5 py-4">Total</th>
              <th className="px-5 py-4">Received</th>
              <th className="px-5 py-4">Due</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {sales.length > 0 ? (
              sales.map((sale) => {
                const status = getSaleStatus(sale);

                return (
                  <tr key={sale.id} className="hover:bg-gray-50">

                    <td className="px-5 py-4 text-sm font-semibold text-[#E53935]">
                      {sale.invoiceNo}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {sale.date}
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-gray-800">
                        {sale.customer}
                      </p>
                      <p className="text-xs text-gray-400">
                        {sale.phone}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-xs font-semibold text-gray-600">
                      {sale.saleType}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                      {formatCurrency(sale.total)}
                    </td>

                    <td className="px-5 py-4 text-sm text-green-700">
                      {formatCurrency(sale.paid)}
                    </td>

                    <td className="px-5 py-4 text-sm text-red-600">
                      {formatCurrency(sale.due)}
                    </td>

                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${statusClasses[status]}`}>
                        {status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-1">

                        <button
                          onClick={() => onView(sale)}
                          title="View"
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() => onEdit(sale)}
                          title="Edit"
                          className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => onInvoice(sale)}
                          title="Print Invoice"
                          className="rounded-lg p-2 text-purple-600 hover:bg-purple-50"
                        >
                          <Printer size={16} />
                        </button>

                        <button
                          onClick={() => onDelete(sale)}
                          title="Delete"
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="py-16 text-center text-sm text-gray-400">
                  No sales records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;
