
import React from "react";
import { CalendarDays, Search } from "lucide-react";

const ReportFilters = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  search,
  setSearch,
  onGenerate,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-2">
            FROM DATE
          </label>
          <div className="relative">
            <CalendarDays
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="date"
              value={fromDate}
              max={toDate || undefined}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-2">
            TO DATE
          </label>
          <div className="relative">
            <CalendarDays
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="date"
              value={toDate}
              min={fromDate || undefined}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-2">
            SEARCH REPORT
          </label>
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search records..."
              className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-end">
          <button
            onClick={onGenerate}
            className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;
