
import React from "react";
import {
  Eye,
  Pencil,
  UserX,
} from "lucide-react";

import {
  formatCurrency,
  getCustomerTypeLabel,
} from "../utils/customerHelpers";

const CustomerTable = ({
  customers,
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
                "Customer",
                "Customer Code",
                "Mobile",
                "Type",
                "City",
                "Credit Limit",
                "Outstanding",
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
            {customers.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-12 text-slate-400">
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-slate-50"
                >
                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-800">
                      {customer.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {customer.email || "No email"}
                    </p>
                  </td>

                  <td className="px-4 py-4 font-medium text-blue-600">
                    {customer.customerCode}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    {customer.phone}
                  </td>

                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      customer.type === "WHOLESALE"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {getCustomerTypeLabel(customer.type)}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    {customer.city || "-"}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    {formatCurrency(customer.creditLimit)}
                  </td>

                  <td className="px-4 py-4 font-semibold text-orange-600 whitespace-nowrap">
                    {formatCurrency(customer.outstanding)}
                  </td>

                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      customer.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {customer.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onView(customer)}
                        title="View"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() => onEdit(customer)}
                        title="Edit"
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                      >
                        <Pencil size={17} />
                      </button>

                      {customer.status === "ACTIVE" && (
                        <button
                          onClick={() => onDelete(customer.id)}
                          title="Deactivate"
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <UserX size={17} />
                        </button>
                      )}
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

export default CustomerTable;
