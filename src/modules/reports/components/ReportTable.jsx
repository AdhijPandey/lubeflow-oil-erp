
import React from "react";
import { formatReportValue } from "../utils/reportsHelpers";

const ReportTable = ({ columns = [], rows = [] }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-5 border-b flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-800">
            Report Details
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {rows.length} records found
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-4 text-left font-semibold whitespace-nowrap"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length || 1}
                  className="text-center py-12 text-slate-400"
                >
                  No records found for the selected filters.
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr
                  key={row.id || row.saleNo || row.purchaseNo || row.customerCode || row.supplierCode || index}
                  className="hover:bg-slate-50"
                >
                  {columns.map((column) => {
                    const value = row[column.key];

                    const isStatus = column.key === "status";

                    return (
                      <td
                        key={column.key}
                        className="px-4 py-4 text-slate-700 whitespace-nowrap"
                      >
                        {isStatus ? (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                            {value || "-"}
                          </span>
                        ) : (
                          formatReportValue(column.key, value)
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;
