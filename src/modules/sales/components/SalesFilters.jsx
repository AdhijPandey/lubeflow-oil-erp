
import React from "react";
import { Search, X } from "lucide-react";

const SalesFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  saleType,
  setSaleType,
  onClear,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-3 lg:flex-row">

        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoice, customer, phone..."
            className="h-11 w-full rounded-lg border border-gray-200 pl-10 pr-4 text-sm outline-none focus:border-[#E53935]"
          />
        </div>

        <div className="flex flex-wrap gap-3">

          <select
            value={saleType}
            onChange={(e) => setSaleType(e.target.value)}
            className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none"
          >
            <option value="ALL">All Sales</option>
            <option value="RETAIL">Retail</option>
            <option value="WHOLESALE">Wholesale</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none"
          >
            <option value="ALL">All Payments</option>
            <option value="PAID">Paid</option>
            <option value="PARTIAL">Partial</option>
            <option value="UNPAID">Unpaid</option>
          </select>

          <button
            onClick={onClear}
            className="flex h-11 items-center gap-2 rounded-lg border border-gray-200 px-4 text-sm text-gray-600 hover:bg-gray-50"
          >
            <X size={15} />
            Clear
          </button>

        </div>
      </div>
    </div>
  );
};

export default SalesFilters;
