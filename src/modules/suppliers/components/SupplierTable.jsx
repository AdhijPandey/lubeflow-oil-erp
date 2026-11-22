
import React from "react";
import {
  Eye,
  Pencil,
  UserX,
} from "lucide-react";

import {
  formatCurrency,
  getSupplierTypeLabel,
} from "../utils/supplierHelpers";

const SupplierTable = ({
  suppliers,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              {[
                "Supplier",
                "Supplier Code",
                "Contact Person",
                "Mobile",
                "Type",
                "City",
                "Payment Terms",
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
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-12 text-slate-400">
                  No suppliers found.
                </td>
              </tr>
            ) : (
              suppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-800">
                      {supplier.companyName}
                    </p>
                    <p className="text-xs text-slate-400">
                      {supplier.email || "No email"}
                    </p>
                  </td>

                  <td className="px-4 py-4 font-medium text-blue-600">
                    {supplier.supplierCode}
                  </td>

                  <td className="px-4 py-4">
                    {supplier.contactPerson || "-"}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    {supplier.phone}
                  </td>

                  <td className="px-4 py-4">
                    {getSupplierTypeLabel(supplier.supplierType)}
                  </td>

                  <td className="px-4 py-4">
                    {supplier.city || "-"}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    {supplier.paymentTerms}
                  </td>

                  <td className="px-4 py-4 font-semibold text-orange-600 whitespace-nowrap">
                    {formatCurrency(supplier.outstanding)}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        supplier.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {supplier.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onView(supplier)}
                        title="View"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() => onEdit(supplier)}
                        title="Edit"
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                      >
                        <Pencil size={17} />
                      </button>

                      {supplier.status === "ACTIVE" && (
                        <button
                          onClick={() => onDelete(supplier.id)}
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

export default SupplierTable;
