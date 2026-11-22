
import React, { useMemo } from "react";
import { formatCurrency } from "../utils/reportsHelpers";

const ReportChart = ({ rows = [], reportType }) => {
  const chartData = useMemo(() => {
    if (!["SALES", "PURCHASE"].includes(reportType)) {
      return [];
    }

    const groups = {};

    rows.forEach((row) => {
      const date = row.date;
      if (!date) return;

      const month = date.slice(0, 7);
      groups[month] = (groups[month] || 0) + Number(row.total || 0);
    });

    return Object.entries(groups)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, amount]) => ({
        month,
        label: new Date(`${month}-01T00:00:00`).toLocaleDateString(
          "en-IN",
          { month: "short", year: "2-digit" }
        ),
        amount,
      }));
  }, [rows, reportType]);

  const maxValue = Math.max(
    ...chartData.map((item) => item.amount),
    1
  );

  if (!chartData.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="font-semibold text-slate-800">
          Report Trend
        </h3>
        <p className="text-sm text-slate-400 mt-4">
          No dated transaction data available for the chart.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className="mb-6">
        <h3 className="font-semibold text-slate-800">
          {reportType === "SALES" ? "Sales Trend" : "Purchase Trend"}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Monthly transaction value
        </p>
      </div>

      <div className="flex items-end gap-3 h-48">
        {chartData.map((item) => (
          <div
            key={item.month}
            className="flex-1 flex flex-col items-center justify-end gap-2 min-w-0 h-full"
          >
            <span className="text-[10px] text-slate-500 truncate max-w-full">
              {formatCurrency(item.amount)}
            </span>

            <div className="w-full flex-1 flex items-end">
              <div
                className="w-full rounded-t-md bg-blue-500 hover:bg-blue-600 transition-colors"
                style={{
                  height: `${Math.max(
                    5,
                    (item.amount / maxValue) * 100
                  )}%`,
                }}
                title={formatCurrency(item.amount)}
              />
            </div>

            <span className="text-xs text-slate-500">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportChart;
